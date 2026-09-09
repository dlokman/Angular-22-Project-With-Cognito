import { Component, signal, inject } from '@angular/core';
import { Chat } from '../../shared/components/chat/chat';
import type { Message } from '@ag-ui/client';
import { ConfigService } from '../../core/config-service/config-service';

@Component({
  imports: [Chat],
  selector: 'app-chat-2',
  styleUrl: './chat-2.css',
  templateUrl: './chat-2.html',
})
export class Chat2 {
  readonly messages = signal<Message[]>([]);
  private readonly configService = inject(ConfigService);
  readonly config = this.configService.appConfig;
}



