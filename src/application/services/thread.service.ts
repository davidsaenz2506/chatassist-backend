import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { IAudit } from 'src/common/entities/audit.entity';
import {
  ASSISTANT_REPOSITORY,
  IAssistantRepository,
} from 'src/domain/assistant/interfaces/assistant.repository';
import {
  IThreadRepository,
  THREAD_REPOSITORY,
} from 'src/domain/thread/interfaces/thread.repository';
import { IThreadService } from 'src/domain/thread/interfaces/thread.service';
import { IThread } from 'src/domain/thread/thread.entity';
import {
  IOpenAIService,
  OPENAI_SERVICE,
} from 'src/infrastructure/service/openai/openai.service';

@Injectable()
export class ThreadService implements IThreadService {
  constructor(
    @Inject(OPENAI_SERVICE)
    private readonly openAiService: IOpenAIService,
    @Inject(ASSISTANT_REPOSITORY)
    private readonly assistantRepository: IAssistantRepository,
    @Inject(THREAD_REPOSITORY)
    private readonly threadRepository: IThreadRepository,
  ) {}

  async findAll(): Promise<IThread[]> {
    return await this.threadRepository.findAll();
  }

  findThreadById(threadId: string): Promise<IThread> {
    throw new Error('Method not implemented.');
  }

  async getAllThreadMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[]> {
    const threadMessages =
      await this.openAiService.getAllThreadMessages(threadId);
    return threadMessages;
  }

  async sendMessage(
    threadId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent> {
    const assistantId = await this.assistantRepository.findFirstAssistant();
    return await this.openAiService.chatWithBot(threadId, assistantId, message);
  }

  async create(thread: Partial<IThread>): Promise<IThread> {
    const now = new Date();
    const assistantId = await this.assistantRepository.findFirstAssistant();
    const newThreadId = await this.openAiService.createThread();
    const auditInfo: IAudit = {
      createdBy: null,
      createdAt: now,
      updatedBy: null,
      updatedAt: now,
    };

    thread.assistantId = assistantId;
    thread.threadId = newThreadId;

    return this.threadRepository.create({ ...thread, ...auditInfo });
  }

  update(threadId: string, thread: Partial<IThread>): Promise<IThread> {
    throw new Error('Method not implemented.');
  }

  async delete(threadId: string): Promise<void> {
    await this.openAiService.deleteThread(threadId);
    await this.threadRepository.delete(threadId);
  }
}
