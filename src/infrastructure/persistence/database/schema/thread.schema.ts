import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IThread } from 'src/domain/thread/thread.entity';
import { IUser } from 'src/domain/user/user.entity';

import { Document } from 'mongoose';

@Schema()
export class Thread implements IThread {
  _id?: string;
  @Prop({ type: String, required: true, unique: false })
  userId: string;
  @Prop({ type: String, required: true, unique: false })
  threadName: string;
  @Prop({ type: String, required: true, unique: true })
  threadId: string;
  @Prop({ type: Object, default: null })
  createdBy: IUser;
  @Prop({ type: String, required: true, unique: false })
  assistantId: string;
  @Prop({ type: Object, default: null })
  updatedBy: IUser;
  @Prop({ type: Date, default: null })
  createdAt: Date;
  @Prop({ type: Date, default: null })
  updatedAt: Date;
}

export type ThreadDocument = Thread & Document;

export const ThreadSchema = SchemaFactory.createForClass(Thread);

ThreadSchema.index({ threadId: 1 }, { unique: true });
