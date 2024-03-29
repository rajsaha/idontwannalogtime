import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { LogType } from './log-type.schema';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  workedOn: string;

  @Prop({ required: true })
  timeSpentInPlainEnglish: string;

  @Prop({ required: true })
  timeSpent: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LogType',
    required: true,
  })
  logType: LogType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;

  @Prop({ type: String })
  note?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
