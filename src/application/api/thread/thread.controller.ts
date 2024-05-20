import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import OpenAI from 'openai';
import { ThreadDTO } from 'src/application/dto/thread.dto';
import { ThreadMessageDTO } from 'src/application/dto/threadmessage.dto';
import { ApiController } from 'src/common/base/api.controller';
import {
  IThreadService,
  THREAD_SERVICE,
} from 'src/domain/thread/interfaces/thread.service';
import { IThread } from 'src/domain/thread/thread.entity';

@Controller('thread')
export class ThreadController extends ApiController {
  constructor(
    @Inject(THREAD_SERVICE)
    private readonly threadService: IThreadService,
  ) {
    super();
  }

  @Get('/threadId/:thread_id')
  async getThreadById(
    @Res() res: any,
    @Param('thread_id') threadId,
  ): Promise<IThread | void> {
    try {
      const thread: IThread = await this.threadService.findThreadById(threadId);
      return this.ok(res, thread);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Get('/')
  async getAll(@Res() res: any): Promise<IThread[] | void> {
    try {
      const threads: IThread[] = await this.threadService.findAll();
      return this.ok(res, threads);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Post('/')
  async create(
    @Res() res: any,
    @Body() payload: ThreadDTO,
  ): Promise<IThread | void> {
    try {
      const createdThread: IThread = await this.threadService.create(payload);
      return this.created(res, createdThread);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Get('/messenger-service/get-messages-by-thread/:openai_thread_id')
  async getAllThreadMessages(
    @Res() res: any,
    @Param('openai_thread_id') threadId,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[] | void> {
    try {
      const threadMessages: OpenAI.Beta.Threads.Messages.Message[] =
        await this.threadService.getAllThreadMessages(threadId);
      return this.ok(res, threadMessages);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Post('/messenger-service/:openai_thread_id')
  async sendMessage(
    @Res() res: any,
    @Param('openai_thread_id') threadId,
    @Body() payload: ThreadMessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent | void> {
    try {
      const { message } = payload;
      const sendMessageResponse = await this.threadService.sendMessage(
        threadId,
        message,
      );
      return this.ok(res, sendMessageResponse);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Put('/:thread_id')
  async update(
    @Res() res: any,
    @Param('thread_id') threadId,
    @Body() payload: ThreadDTO,
  ): Promise<IThread | void> {
    try {
      const updatedThread: IThread = await this.threadService.update(
        threadId,
        payload,
      );
      return this.ok(res, updatedThread);
    } catch (error) {
      return this.badrequest(error);
    }
  }

  @Delete('/:thread_id')
  async delete(@Res() res: any, @Param('thread_id') threadId): Promise<void> {
    try {
      await this.threadService.delete(threadId);
      return this.ok(res, {
        message: 'Thread deleted successfully',
      });
    } catch (error) {
      return this.badrequest(error);
    }
  }
}
