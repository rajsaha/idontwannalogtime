import { Module } from '@nestjs/common';
import { LogTypeService } from './log-type.service';

@Module({
  providers: [LogTypeService]
})
export class LogTypeModule {}
