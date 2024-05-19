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
      console.log('Successfully logged in to Salesforce');
    } catch (error) {
      throw new Error(`Error logging in to Salesforce: ${error.message}`);
    }
  }

  public async findAccounts(): Promise<any> {
    await this.login();

    return new Promise((resolve, reject) => {
      // @ts-expect-error
      this.connection.query('SELECT Id, Name FROM Account', (err, result) => {
        if (err) {
          console.error('Error querying Salesforce:', err);
          return reject(err);
        } else {
          return resolve(result.records);
        }
      });
    });
  }
}
