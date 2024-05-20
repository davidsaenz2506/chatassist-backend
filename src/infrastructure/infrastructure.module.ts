import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { OpenAIService } from './service/openai/impl/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PersistenceModule, HttpModule],
  exports: [PersistenceModule, OpenAIService, HttpModule],
  providers: [OpenAIService],
})
export class InfrastructureModule {}
