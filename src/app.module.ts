import { Module } from '@nestjs/common';
import { ApiModule } from './application/api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ApiModule,
    InfrastructureModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
