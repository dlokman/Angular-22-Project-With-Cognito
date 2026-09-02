import { Service } from '@angular/core';
import { BedrockAgentCoreClient, InvokeAgentRuntimeCommand } from '@aws-sdk/client-bedrock-agentcore';
import { awsLocalConfig } from '../../config/aws.local';

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
  // Strands Interrupt Test
  //private readonly agentRuntimeArn = 'arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/AngularInterruptTest_MyAgent-FShQwX60wH';

  // Pointing to Demo 1 - Agentcore Runtime for Restaurant Assistant
  private readonly agentRuntimeArn = "arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/restaurantassistant_restaurant_assistant-0zuMLq5kJ2";

  private readonly client = new BedrockAgentCoreClient({
    region: 'us-east-1',

    // TODO- Integrate Cognito with Angular and Get from Parameter Store SecureString Or Secrets Manager.
    // This Demo is just to quickly showcase CopilotKit Chat with Angular
    credentials: {
      accessKeyId: awsLocalConfig.accessKeyId,
      secretAccessKey:  awsLocalConfig.secretAccessKey,
    }
  });

  // done
  sendPrompt(sessionId: string, prompt: string): AsyncGenerator<AgentEvent> {
    return this.invoke(sessionId, { prompt });
  }

  respondToInterrupt( sessionId: string, interruptId: string, approved: boolean): AsyncGenerator<AgentEvent> {
    return this.invoke(sessionId, {
      interruptResponses: [
        {
          interruptResponse: {
            interruptId,
            response: approved ? 'y' : 'n',
          },
        },
      ],
    });
  }

  private async *invoke(sessionId: string, payload: unknown): AsyncGenerator<AgentEvent> {
    const response = await this.client.send(
      new InvokeAgentRuntimeCommand({
        agentRuntimeArn: this.agentRuntimeArn,
        runtimeSessionId: sessionId,
        qualifier: 'DEFAULT',
        contentType: 'application/json',
        accept: 'text/event-stream',
        payload: JSON.stringify(payload),
      }),
    );

    if (!response.response) {
      throw new Error('AgentCore returned no response body.');
    }

    const reader = response.response.transformToWebStream().getReader();
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
