import { Component, forwardRef, inject, signal, model,input } from '@angular/core';
import { ChatState, CopilotChatInput, CopilotChatMessageView, CopilotChatView } from '@copilotkit/angular';
import type { Message } from '@ag-ui/client';
import { Router } from '@angular/router';
import { AgentEvent, AgentInterrupt, ChatHelperService } from './chat-helper.service';
import { AgentCoreConfig } from '../../../core/config-service/config.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CopilotChatView, CopilotChatMessageView, CopilotChatInput],
  providers: [
    {
      provide: ChatState,
      useExisting: forwardRef(() => Chat),
    },
  ],
  styleUrl: './chat.css',
  templateUrl: './chat.html'
})
export class Chat extends ChatState {
  private readonly chatHelper = inject(ChatHelperService);
  private readonly router = inject(Router);

  readonly agentCoreConfig = input.required<AgentCoreConfig>();
  readonly messages = model<Message[]>([]);
  readonly inputValue = signal('');
  readonly isSubmitting = signal(false);
  readonly interrupt = signal<AgentInterrupt | null>(null);
  readonly sessionId = signal(crypto.randomUUID());

  changeInput(value: string): void {
    this.inputValue.set(value);
  }

  async submitInput(value: string): Promise<void> {

    requestAnimationFrame(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
    });

    const text = value.trim();

    if (!text || this.isSubmitting()) {
      return;
    }

    this.inputValue.set('');
    this.interrupt.set(null);
    this.addMessage('user', text);

    await this.run(this.chatHelper.sendPrompt(this.sessionId(), text, this.agentCoreConfig()));
  }

  newChat(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.messages.set([]);
    this.inputValue.set('');
    this.isSubmitting.set(false);
    this.interrupt.set(null);
    this.sessionId.set(crypto.randomUUID());
  }

  approve(): Promise<void> {
    return this.resume(true);
  }

  reject(): Promise<void> {
    return this.resume(false);
  }

  private async resume(approved: boolean): Promise<void> {
    const interrupt = this.interrupt();

    if (!interrupt || this.isSubmitting()) {
      return;
    }

    this.interrupt.set(null);

    await this.run(
      this.chatHelper.respondToInterrupt(this.sessionId(), interrupt.id, approved, this.agentCoreConfig())
    );
  }

  private async run(events: AsyncGenerator<AgentEvent>): Promise<void> {
    const messageId = crypto.randomUUID();

    this.addMessage('assistant', '', messageId);
    this.isSubmitting.set(true);

    try {
      for await (const event of events) {
        if (event.type === 'text') {
          this.appendText(messageId, event.text);
        }

        if (event.type === 'interrupt') {
          this.interrupt.set(event.interrupt);
        }
      }

      this.removeMessageIfEmpty(messageId);
    } catch (error) {
        //this.appendText( messageId, error instanceof Error ? error.message : 'Request failed.');
        console.error('AgentCore request failed:', error);
        await this.router.navigateByUrl('/error');
    } finally {
        this.isSubmitting.set(false);
    }
  }

  // id is the id of the message being added. If not provided, a new UUID is generated.
  private addMessage(role: 'user' | 'assistant', content: string, id = crypto.randomUUID()): void {
    this.messages.update(messages => [
      ...messages,
      { id, role, content } as Message,
    ]);
  }

  private appendText(messageId: string, text: string): void {
    this.messages.update(messages =>
      messages.map(message =>
        message.id === messageId
          ? { ...message, content: `${message.content ?? ''}${text}` } as Message
          : message,
      ),
    );
  }

  private removeMessageIfEmpty(messageId: string): void {
    this.messages.update(messages =>
      messages.filter(message =>
        message.id !== messageId ||    // keep other messages
        Boolean(String(message.content ?? '').trim()), // remove this message if empty
      ),
    );
  }
}
