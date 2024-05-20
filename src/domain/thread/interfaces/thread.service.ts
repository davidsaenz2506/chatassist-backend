import OpenAI from 'openai';
import { IThread } from '../thread.entity';

export interface IThreadService {
  findThreadById(threadId: string): Promise<IThread>;
  findAll(): Promise<IThread[]>;
  sendMessage(
    threadId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent>;
  getAllThreadMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[]>;
  create(thread: Partial<IThread>): Promise<IThread>;
  update(threadId: string, thread: Partial<IThread>): Promise<IThread>;
  delete(threadId: string): Promise<void>;
}

export const THREAD_SERVICE = 'THREAD_SERVICE';
