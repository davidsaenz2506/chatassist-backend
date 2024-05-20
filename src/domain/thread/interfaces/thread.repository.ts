import { IThread } from '../thread.entity';

export interface IThreadRepository {
  findAll(): Promise<IThread[]>;
  findThreadById(threadId: string): Promise<IThread>;
  create(thread: Partial<IThread>): Promise<IThread>;
  update(threadId: string, thread: Partial<IThread>): Promise<IThread>;
  delete(threadId: string): Promise<void>;
}

export const THREAD_REPOSITORY = 'THREAD_REPOSITORY';
