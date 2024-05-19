import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { OpenAIService } from './service/openai/impl/openai.service';

@Module({
  imports: [PersistenceModule],
  exports: [PersistenceModule, OpenAIService],
  providers: [OpenAIService],
})
export class InfrastructureModule {}
