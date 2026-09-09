import { Component, signal, inject } from '@angular/core';
import { Chat } from '../../shared/components/chat/chat';
import type { Message } from '@ag-ui/client';
import { ConfigService } from '../../core/config-service/config-service';

@Component({
  imports: [Chat],
  selector: 'app-chat-1',
  styleUrl: './chat-1.css',
  templateUrl: './chat-1.html',
})
export class Chat1 {
  readonly messages = signal<Message[]>([]);
  private readonly configService = inject(ConfigService);
  readonly config = this.configService.appConfig;
}
