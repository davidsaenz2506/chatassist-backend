import OpenAI from 'openai';

export interface IOpenAIService {
  chatWithBot(
    threadId: string,
    assistantId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent>;
  createThread(): Promise<string>;
  getAllThreadMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[]>;
  createAssistant(
    assistantName: string,
    assitantDescription: string,
  ): Promise<string>;
}

export const OPENAI_SERVICE = 'OPENAI_SERVICE';
