import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IThreadRepository } from 'src/domain/thread/interfaces/thread.repository';
import { Thread, ThreadDocument } from '../../schema/thread.schema';
import { IThread } from 'src/domain/thread/thread.entity';

@Injectable()
export class MongoThreadRepository implements IThreadRepository {
  constructor(
    @InjectModel(Thread.name)
    private threadModel: Model<ThreadDocument>,
  ) {}
  async findThreadById(threadId: string): Promise<IThread> {
    throw new Error('Method not implemented.');
  }
  async create(thread: Partial<IThread>): Promise<IThread> {
    const createdThread = await this.threadModel.create(thread);
    return createdThread;
  }
  async update(threadId: string, thread: Partial<IThread>): Promise<IThread> {
    throw new Error('Method not implemented.');
  }
  async delete(threadId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
