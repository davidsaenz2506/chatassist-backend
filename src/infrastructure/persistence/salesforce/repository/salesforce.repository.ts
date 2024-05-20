import { Injectable } from '@nestjs/common';
import { ISalesforceRepository } from 'src/domain/salesforce/interfaces/salesforce.repository';

import * as jsforce from 'jsforce';

@Injectable()
export class SalesforceRepository implements ISalesforceRepository {
  private connection: jsforce.Connection;

  constructor() {
    this.connection = new jsforce.Connection({
      loginUrl: process.env.SALESFORCE_LOGIN_URL,
    });
  }

  private async login(): Promise<void> {
    const username = process.env.SALESFORCE_USERNAME;
    const password =
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN;

    try {
      await this.connection.login(username, password);
    } catch (error) {
      throw new Error(`Error logging in to Salesforce: ${error.message}`);
    }
  }

  public async destroyOrderByOrderNumber(orderNumber: string): Promise<string> {
    await this.login();

    const orderByNumber = await this.connection
      .sobject('Order')
      .findOne({ OrderNumber: orderNumber })
      .destroy();

    if (!orderByNumber.length)
      return 'We have not found an order that matches this number, try with another identifier';

    return 'Order successfully deleted';
  }

  public async findAccounts(): Promise<any> {
    await this.login();

    return JSON.stringify(await this.connection.sobject('Account').find());
  }
}
