import { Module, Provider } from '@nestjs/common';
import { ThreadService } from 'src/application/services/thread.service';
import { THREAD_SERVICE } from 'src/domain/thread/interfaces/thread.service';
import { InfrastructureModule } from '../infrastructure.module';
import { OpenAIService } from '../service/openai/impl/openai.service';
import { OPENAI_SERVICE } from '../service/openai/openai.service';
import { AssistantService } from 'src/application/services/assistant.service';
import { ASSISTANT_SERVICE } from 'src/domain/assistant/interfaces/assistant.service';

const providers: Provider[] = [
  {
    useClass: ThreadService,
    provide: THREAD_SERVICE,
  },
  {
    useClass: OpenAIService,
    provide: OPENAI_SERVICE,
  },
  {
    useClass: AssistantService,
    provide: ASSISTANT_SERVICE,
  },
];

@Module({
  imports: [InfrastructureModule],
  providers: [...providers],
  exports: [...providers],
})
export class DomainModule {}
