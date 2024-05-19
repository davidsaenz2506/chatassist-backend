import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AssistantDTO } from 'src/application/dto/assistant.dto';
import { ApiController } from 'src/common/base/api.controller';
import { IAssistant } from 'src/domain/assistant/assistant.entity';
import {
  ASSISTANT_SERVICE,
  IAssistantService,
} from 'src/domain/assistant/interfaces/assistant.service';

@Controller('assistant')
export class AssistantController extends ApiController {
  constructor(
    @Inject(ASSISTANT_SERVICE)
    private readonly assistantService: IAssistantService,
  ) {
    super();
  }

  @Post('/')
  async create(
    @Res() res: any,
    @Body() payload: AssistantDTO,
  ): Promise<IAssistant | void> {
    try {
      const createdAssistant: IAssistant =
        await this.assistantService.create(payload);
      return this.created(res, createdAssistant);
    } catch (error) {
      return this.badrequest(error);
    }
  }
}
