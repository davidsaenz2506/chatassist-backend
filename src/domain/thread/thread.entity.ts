import { IAudit } from 'src/common/entities/audit.entity';

export interface IThread extends IAudit {
  id?: string;
  userId: string;
  threadName: string;
  threadId: string;
  assistantId: string;
}
