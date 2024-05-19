import { IAssistant } from 'src/domain/assistant/assistant.entity';

export class AssistantDTO implements Partial<IAssistant> {
  name: string;
  description: string;
  userId: string;
}
