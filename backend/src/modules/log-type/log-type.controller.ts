import { Controller, Get } from '@nestjs/common';
import { LogType } from '../../schemas/log-type.schema';
import { LogTypeService } from './log-type.service';

@Controller('log-type')
export class LogTypeController {
  constructor(private logTypeService: LogTypeService) {}
  @Get('all')
  getLogTypes(): Promise<LogType[]> {
    return this.logTypeService.getLogTypes();
  }
}
