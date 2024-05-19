import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IAssistantRepository } from 'src/domain/assistant/interfaces/assistant.repository';
import { Assistant, AssistantDocument } from '../../schema/assistant.schema';
import { IAssistant } from 'src/domain/assistant/assistant.entity';

@Injectable()
export class MongoAssistantRepository implements IAssistantRepository {
  constructor(
    @InjectModel(Assistant.name)
    private assistantModel: Model<AssistantDocument>,
  ) {}
  async findFirstAssistant(): Promise<string> {
    const assistant = await this.assistantModel.findOne().select('assistantId');

    if (assistant && assistant.assistantId) {
      return assistant.assistantId;
    } else {
      return null;
    }
  }
  async create(assistant: Partial<IAssistant>): Promise<IAssistant> {
    const createdAssistant = await this.assistantModel.create(assistant);
    return createdAssistant;
  }
}
