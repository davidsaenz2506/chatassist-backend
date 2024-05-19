import { Module, Provider } from '@nestjs/common';
import { SalesforceRepository } from './repository/salesforce.repository';
import { SALESFORCE_REPOSITORY } from 'src/domain/salesforce/interfaces/salesforce.repository';

const providers: Provider[] = [
  {
    provide: SALESFORCE_REPOSITORY,
    useClass: SalesforceRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class SalesforceModule {}
