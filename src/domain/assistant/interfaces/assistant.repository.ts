import { IAssistant } from '../assistant.entity';

export interface IAssistantRepository {
  findFirstAssistant(): Promise<string>;
  create(assistant: Partial<IAssistant>): Promise<IAssistant>;
}

export const ASSISTANT_REPOSITORY = 'ASSISTANT_REPOSITORY';
