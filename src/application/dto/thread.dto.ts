import { IThread } from 'src/domain/thread/thread.entity';
import { IUser } from 'src/domain/user/user.entity';

export class ThreadDTO implements Partial<IThread> {
  id?: string;
  userId: string;
  threadName: string;
  threadId?: string;
  assistantId?: string;
  createdBy?: IUser;
  updatedBy?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
