import { Service, inject } from '@angular/core';
import { AuthService } from '../../../core/auth-service/auth-service';
import { AgentCoreConfig } from '../../../core/config-service/config.interface';
// import { ConfigService } from '../../../core/config-service/config-service';

export interface AgentInterrupt {
  id: string;
  name: string;
  reason: {
    message: string;
    paths?: string[];
    count?: number;
  };
}

export type AgentEvent = { type: 'text'; text: string } | { type: 'interrupt'; interrupt: AgentInterrupt };

@Service()
export class ChatHelperService {

  private readonly authService = inject(AuthService);
  //private readonly configService = inject(ConfigService);

  sendPrompt(sessionId: string, prompt: string, agentCoreConfig: AgentCoreConfig): AsyncGenerator<AgentEvent> {
    return this.invoke(sessionId, { prompt }, agentCoreConfig);
  }

  respondToInterrupt( sessionId: string, interruptId: string, approved: boolean, agentCoreConfig: AgentCoreConfig): AsyncGenerator<AgentEvent> {
    return this.invoke(sessionId, {
                      interruptResponses: [
                          {
                            interruptResponse: {
                              interruptId,
                              response: approved ? 'y' : 'n',
                            },
                          },
                        ],
                      },
                      agentCoreConfig);
  }

  private async *invoke(sessionId: string, payload: unknown, agentCoreConfig: AgentCoreConfig): AsyncGenerator<AgentEvent> {

    const accessToken = await this.authService.getAccessToken();

    if (!accessToken) {
      throw new Error('No Cognito access token is available. Please sign in again.');
    }

    const encodedRuntimeArn = encodeURIComponent(agentCoreConfig.runtimeArn);
    const qualifier = encodeURIComponent(agentCoreConfig.qualifier);

    // https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-oauth.html
    const url =
      `${agentCoreConfig.endpoint}/runtimes/${encodedRuntimeArn}` +
      `/invocations?qualifier=${qualifier}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // username will come from the Cognito access token
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'X-Amzn-Bedrock-AgentCore-Runtime-Session-Id': sessionId,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `AgentCore invocation failed: ${response.status} ${response.statusText}`,
      );
    }

    if (!response.body) {
      throw new Error('AgentCore returned no response body.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = '';

    try {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const event = this.parseLine(line);

          if (event) {
            yield event;
          }
        }
      }

      buffer += decoder.decode();

      if (buffer.trim()) {
        const event = this.parseLine(buffer);

        if (event) {
          yield event;
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  private parseLine(line: string): AgentEvent | null {
    const raw = line.trim();

    if (!raw || raw.startsWith('event:')) {
      return null;
    }

    const dataText = raw.replace(/^data:\s*/, '');

    console.log('RAW AGENTCORE EVENT:', dataText);

    if (!dataText || dataText === '[DONE]') {
      return null;
    }

    try {
      const data = JSON.parse(dataText);

      if (data.type === 'interrupt' && data.interrupts?.length) {
      return {
        type: 'interrupt',
        interrupt: data.interrupts[0],
      };
      }

      if (data.type === 'message' && typeof data.message === 'string') {
      return {
        type: 'text',
        text: data.message,
      };
      }

      const text = data?.event?.contentBlockDelta?.delta?.text;

      if (typeof text === 'string') {
      return {
        type: 'text',
        text,
      };
      }

      if (typeof data === 'string') {
      return {
        type: 'text',
        text: data,
      };
      }

      return null;
    } catch {
      return null;
    }
  }

}
