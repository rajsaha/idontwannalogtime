import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LogTypeService } from './log-type.service';
import { Dropdown } from '../../interfaces/dropdown.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogType } from '../../schemas/log-type.schema';
import {
  UpdateLogTypeDto,
  UpdateLogTypeSchema,
} from './dto/update-log-type.dto';
import { JoiValidationPipe } from '../../util/joi-validation.pipe';

@Controller('log-type')
@UseGuards(JwtAuthGuard)
export class LogTypeController {
  constructor(private logTypeService: LogTypeService) {}
  @Get('all')
  getLogTypes(@Request() req): Promise<Dropdown[]> {
    return this.logTypeService.getLogTypes(req.user.userId);
  }

  @Get(':id')
  getLogType(@Param() params): Promise<LogType> {
    return this.logTypeService.getLogType(params.id);
  }

  @Delete(':id')
  delete(@Param() params): Promise<LogType> {
    return this.logTypeService.deleteLogType(params.id);
  }

  @UsePipes(new JoiValidationPipe(UpdateLogTypeSchema))
  @Patch()
  update(@Body() updateLogTypeDto: UpdateLogTypeDto): Promise<LogType> {
    return this.logTypeService.update(updateLogTypeDto);
  }
}
