/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Chat2 } from './chat-2';
import { ChatHelperService } from '../../shared/components/chat/chat-helper.service';
import { ConfigService } from '../../core/config-service/config-service';
import { Chat } from '../../shared/components/chat/chat';
import { Component, input } from '@angular/core';
import { Message } from '@ag-ui/client';
import { AgentCoreConfig } from '../../core/config-service/config.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  template: '',
})
class MockChat {
   readonly messages = input.required<Message[]>();
   readonly agentCoreConfig = input.required<AgentCoreConfig>();
}

describe('Chat2', () => {
  let component: Chat2;
  let fixture: ComponentFixture<Chat2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chat2],
      providers: [
        provideRouter([]),
         {
          provide: ConfigService,
          useValue: {
            appConfig: {
              agentCore1: {
                runtimeArn:
                  'arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/restaurantassistant_restaurant_assistant-0zuMLq5kJ2',
                endpoint:
                  'https://bedrock-agentcore.us-east-1.amazonaws.com',
                qualifier: 'DEFAULT',
              },
            },
          },
        },
        {
          provide: ChatHelperService,
          useValue: {
            sendPrompt: async function* () {},
            respondToInterrupt: async function* () {},
          },
        },
      ],
    })
     .overrideComponent(Chat2, {
        remove: {
          imports: [Chat],
        },
        add: {
          imports: [MockChat],
        },
      }).compileComponents();

    fixture = TestBed.createComponent(Chat2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
