import { IUser } from 'src/domain/user/user.entity';

export interface IAudit {
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
