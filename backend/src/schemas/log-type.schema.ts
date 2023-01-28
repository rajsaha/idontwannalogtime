import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogTypeDocument = HydratedDocument<LogType>;

@Schema()
export class LogType {
  @Prop({ required: true })
  description: string;

  @Prop()
  backgroundColor?: string;

  @Prop()
  color: string;
}

export const LogTypeSchema = SchemaFactory.createForClass(LogType);
