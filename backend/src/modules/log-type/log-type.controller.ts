import { Controller, Get } from '@nestjs/common';
import { LogTypeService } from './log-type.service';
import { Dropdown } from '../../interfaces/dropdown.interface';

@Controller('log-type')
export class LogTypeController {
  constructor(private logTypeService: LogTypeService) {}
  @Get('all')
  getLogTypes(): Promise<Dropdown[]> {
    return this.logTypeService.getLogTypes();
  }
}
