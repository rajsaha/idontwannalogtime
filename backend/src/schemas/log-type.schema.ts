import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type LogTypeDocument = HydratedDocument<LogType>;

export enum LOG_TYPE_CREATED_BY {
  SYSTEM = 'system',
  USER = 'user',
}

@Schema({ timestamps: true })
export class LogType {
  _id?: string;
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdBy: LOG_TYPE_CREATED_BY;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  userId?: User;

  @Prop({ required: false, default: false })
  isDeleted?: boolean;

  @Prop()
  backgroundColor?: string;

  @Prop()
  color: string;
}

export const LogTypeSchema = SchemaFactory.createForClass(LogType);
