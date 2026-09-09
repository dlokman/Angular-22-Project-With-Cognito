/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Chat } from './chat';
import { ChatHelperService } from './chat-helper.service';
import { provideCopilotKit } from '@copilotkit/angular';

describe('Chat', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        provideRouter([]),
        provideCopilotKit({
          runtimeUrl: 'http://localhost/test',
        }),
        {
          provide: ChatHelperService,
          useValue: {
            sendPrompt: async function* () {},
            respondToInterrupt: async function* () {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
