export interface ISalesforceRepository {
  findAccounts(): Promise<any>;
  destroyOrderByOrderNumber(orderNumber: string): Promise<string>;
}

export const SALESFORCE_REPOSITORY = 'SALESFORCE_REPOSITORY';
