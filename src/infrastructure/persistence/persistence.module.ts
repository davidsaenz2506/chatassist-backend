import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SalesforceModule } from './salesforce/salesforce.module';

@Module({
  imports: [DatabaseModule, SalesforceModule],
  exports: [DatabaseModule, SalesforceModule],
  providers: [],
})
export class PersistenceModule {}
