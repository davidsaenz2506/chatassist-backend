import { Inject, Injectable } from '@nestjs/common';
import { IAudit } from 'src/common/entities/audit.entity';
import { IAssistant } from 'src/domain/assistant/assistant.entity';
import {
  ASSISTANT_REPOSITORY,
  IAssistantRepository,
} from 'src/domain/assistant/interfaces/assistant.repository';
import { IAssistantService } from 'src/domain/assistant/interfaces/assistant.service';
import {
  IOpenAIService,
  OPENAI_SERVICE,
} from 'src/infrastructure/service/openai/openai.service';

@Injectable()
export class AssistantService implements IAssistantService {
  constructor(
    @Inject(ASSISTANT_REPOSITORY)
    private readonly assistantRepository: IAssistantRepository,
    @Inject(OPENAI_SERVICE)
    private readonly openAiService: IOpenAIService,
  ) {}
  async create(assistant: Partial<IAssistant>): Promise<IAssistant> {
    const now = new Date();
    const assistantId = await this.openAiService.createAssistant(assistant);

    const auditInfo: IAudit = {
      createdBy: null,
      createdAt: now,
      updatedBy: null,
      updatedAt: now,
    };

    assistant.assistantId = assistantId;

    return this.assistantRepository.create({ ...assistant, ...auditInfo });
  }
}
