import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Thread, ThreadSchema } from '../schema/thread.schema';
import { THREAD_REPOSITORY } from 'src/domain/thread/interfaces/thread.repository';
import { MongoThreadRepository } from './repository/thread.repository';
import { ASSISTANT_REPOSITORY } from 'src/domain/assistant/interfaces/assistant.repository';
import { MongoAssistantRepository } from './repository/assistant.repository';
import { Assistant, AssistantSchema } from '../schema/assistant.schema';

const providers: Provider[] = [
  {
    provide: THREAD_REPOSITORY,
    useClass: MongoThreadRepository,
  },
  {
    provide: ASSISTANT_REPOSITORY,
    useClass: MongoAssistantRepository,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: `mongodb+srv://${configService.get('MONGO_USER')}:${configService.get('MONGO_PASSWORD')}@chatassistcluster.qxvrfqn.mongodb.net/${configService.get('MONGO_DATABASE')}`,
          retryWrites: true,
          appName: 'ChatAssistCluster',
        };
      },
    }),
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
      { name: Assistant.name, schema: AssistantSchema },
    ]),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class MongoModule {}
