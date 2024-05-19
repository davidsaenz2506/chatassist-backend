import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/domain/user/user.entity';

import { Document } from 'mongoose';
import { IAssistant } from 'src/domain/assistant/assistant.entity';

@Schema()
export class Assistant implements IAssistant {
  _id?: string;
  @Prop({ type: String, required: true, unique: false })
  userId: string;
  @Prop({ type: String, required: true, unique: false })
  name: string;
  @Prop({ type: String, required: true, unique: false })
  description: string;
  @Prop({ type: String, required: true, unique: true })
  assistantId: string;
  @Prop({ type: Object, default: null })
  createdBy: IUser;
  @Prop({ type: Object, default: null })
  updatedBy: IUser;
  @Prop({ type: Date, default: null })
  createdAt: Date;
  @Prop({ type: Date, default: null })
  updatedAt: Date;
}

export type AssistantDocument = Assistant & Document;

export const AssistantSchema = SchemaFactory.createForClass(Assistant);

AssistantSchema.index({ AssistantId: 1 }, { unique: true });
