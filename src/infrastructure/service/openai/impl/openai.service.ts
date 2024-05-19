import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { IOpenAIService } from '../openai.service';
import {
  ISalesforceRepository,
  SALESFORCE_REPOSITORY,
} from 'src/domain/salesforce/interfaces/salesforce.repository';

@Injectable()
export class OpenAIService implements IOpenAIService {
  private readonly openAi: OpenAI;
  private readonly engineModel: string = 'gpt-4o';

  constructor(
    @Inject(SALESFORCE_REPOSITORY)
    private readonly salesforceRepository: ISalesforceRepository,
  ) {
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_ENGINE_API_KEY,
    });
  }

  private async getSalesforceAccounts() {
    const response = await this.salesforceRepository.findAccounts();
    return JSON.stringify(response);
  }

  async createThread(): Promise<string> {
    try {
      const thread = await this.openAi.beta.threads.create();
      return thread.id;
    } catch (error) {
      throw new Error(`Error creating assistant and thread: ${error.message}`);
    }
  }

  async createAssistant(
    assistantName: string,
    assistantDescription: string,
  ): Promise<string> {
    try {
      const newAssistant = await this.openAi.beta.assistants.create({
        name: assistantName,
        description: assistantDescription,
        tools: [
          {
            type: 'code_interpreter',
          },
          {
            type: 'function',
            function: {
              name: 'get_salesforce_accounts',
              description:
                'Get all salesforce accounts in general, using the respective function',
            },
          },
        ],
        model: this.engineModel,
      });

      return newAssistant.id;
    } catch (error) {
      throw new Error(`Error creating assistant: ${error.message}`);
    }
  }

  async getAllThreadMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message[]> {
    try {
      return (await this.openAi.beta.threads.messages.list(threadId)).data;
    } catch (error) {
      throw new Error(`Error getting thread messages: ${error.message}`);
    }
  }

  async chatWithBot(
    threadId: string,
    assistantId: string,
    message: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageContent> {
    let runEventId: string | null = null;
    try {
      await this.waitForActiveRunToFinish(threadId);

      const messageResponse = await this.openAi.beta.threads.messages.create(
        threadId,
        {
          role: 'user',
          content: message,
        },
      );

      if (!messageResponse || !messageResponse.content) {
        throw new Error('The message response is invalid or empty.');
      }

      const runEvent = await this.openAi.beta.threads.runs.createAndPoll(
        threadId,
        {
          assistant_id: assistantId,
        },
      );

      runEventId = runEvent.id;

      if (runEvent.required_action) {
        await this.handleRequiredAction(runEvent);
      }

      const messagesResponse =
        await this.openAi.beta.threads.messages.list(threadId);

      if (
        !messagesResponse ||
        !messagesResponse.data ||
        messagesResponse.data.length === 0
      ) {
        throw new Error('Message list is empty or invalid.');
      }

      const latestMessage = messagesResponse.data[0].content[0];

      if (!latestMessage) {
        throw new Error(
          'The content of the most recent message is invalid or empty.',
        );
      }

      return latestMessage;
    } catch (error) {
      if (runEventId) {
        await this.openAi.beta.threads.runs.cancel(threadId, runEventId);
      }

      throw new Error(`Error interacting with OpenAI API: ${error.message}`);
    }
  }

  private async waitForActiveRunToFinish(threadId: string): Promise<void> {
    try {
      const runs = await this.openAi.beta.threads.runs.list(threadId);
      const activeRun = runs.data.find(
        (run) => run.status === 'requires_action',
      );
      if (activeRun) {
        await this.openAi.beta.threads.runs.cancel(threadId, activeRun.id);
      }
    } catch (error) {
      throw new Error(
        `Error waiting for active run to finish: ${error.message}`,
      );
    }
  }

  private async handleRequiredAction(runEvent: OpenAI.Beta.Threads.Runs.Run) {
    const requiredAction = runEvent.required_action;

    const toolOutputs = [];

    for (const toolCall of requiredAction.submit_tool_outputs.tool_calls) {
      const { name: functionName } = toolCall.function;
      if (functionName === 'get_salesforce_accounts') {
        toolOutputs.push({
          tool_call_id: toolCall.id,
          output: 'Accounts: ' + (await this.getSalesforceAccounts()),
        });
      }
    }

    await this.submitToolOutputs(toolOutputs, runEvent.id, runEvent.thread_id);
  }

  private async submitToolOutputs(
    toolOutputs: any[],
    runId: string,
    threadId: string,
  ): Promise<void> {
    await this.openAi.beta.threads.runs.submitToolOutputsAndPoll(
      threadId,
      runId,
      {
        tool_outputs: toolOutputs,
      },
    );
  }
}
