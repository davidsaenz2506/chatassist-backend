export interface ISalesforceRepository {
  findAccounts(): Promise<any>;
}

export const SALESFORCE_REPOSITORY = 'SALESFORCE_REPOSITORY';
