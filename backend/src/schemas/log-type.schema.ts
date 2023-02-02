import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogTypeDocument = HydratedDocument<LogType>;

@Schema({ timestamps: true })
export class LogType {
  _id?: string;
  @Prop({ required: true })
  description: string;

  @Prop()
  backgroundColor?: string;

  @Prop()
  color: string;
}

export const LogTypeSchema = SchemaFactory.createForClass(LogType);
