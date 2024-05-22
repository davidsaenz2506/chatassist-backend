import OpenAI from 'openai';
import { IAssistant } from 'src/domain/assistant/assistant.entity';

export interface IOpenAIService {
  chatWithBot(
    threadId: string,
    assistantId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent>;
  createThread(): Promise<string>;
  deleteThread(threadId: string): Promise<void>;
  getAllThreadMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[]>;
  createAssistant(assistant: Partial<IAssistant>): Promise<string>;
}

export const OPENAI_SERVICE = 'OPENAI_SERVICE';
