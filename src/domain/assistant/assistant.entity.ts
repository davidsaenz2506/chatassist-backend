import { AssistantTool } from 'openai/resources/beta/assistants';
import { IAudit } from 'src/common/entities/audit.entity';

export interface IAssistant extends IAudit {
  name: string;
  description: string;
  assistantId: string;
  userId: string;
  assistantTools: AssistantTool[];
}
