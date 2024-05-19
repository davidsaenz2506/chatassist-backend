import { IAssistant } from '../assistant.entity';

export interface IAssistantService {
  create(assistant: Partial<IAssistant>): Promise<IAssistant>;
}

export const ASSISTANT_SERVICE = 'ASSISTANT_SERVICE';
