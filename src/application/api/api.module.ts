import { Module } from '@nestjs/common';
import { DomainModule } from 'src/infrastructure/ioc/domain.module';
import { ThreadController } from './thread/thread.controller';
import { AssistantController } from './assistant/assistant.controller';

@Module({
  imports: [DomainModule],
  controllers: [ThreadController, AssistantController],
  providers: [],
})
export class ApiModule {}
