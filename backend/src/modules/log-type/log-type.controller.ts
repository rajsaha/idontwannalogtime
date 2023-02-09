import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LogTypeService } from './log-type.service';
import { Dropdown } from '../../interfaces/dropdown.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('log-type')
@UseGuards(JwtAuthGuard)
export class LogTypeController {
  constructor(private logTypeService: LogTypeService) {}
  @Get('all')
  getLogTypes(@Request() req): Promise<Dropdown[]> {
    return this.logTypeService.getLogTypes(req.user.userId);
  }
}
