import { Module } from '@nestjs/common';
import { LogTypeService } from './log-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LogType, LogTypeSchema } from '../schemas/log-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogType.name, schema: LogTypeSchema }]),
  ],
  providers: [LogTypeService],
})
export class LogTypeModule {}
