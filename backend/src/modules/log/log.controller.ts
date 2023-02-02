import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Log } from '../../schemas/log.schema';
import { UpdateLogDto, UpdateLogSchema } from './dto/update-log.dto';
import { CreateLogDto, CreateLogSchema } from './dto/create-log.dto';
import { JoiValidationPipe } from '../../util/joi-validation.pipe';
import { ValidateDatePipe } from '../../pipes/date.pipe';

@Controller('log')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private logService: LogService) {}

  @Get('at-date/:date')
  getLogsAtDate(
    @Request() req,
    @Param('date', ValidateDatePipe)
    params,
  ): Promise<Log[]> {
    return this.logService.getLogsAtDate(req.user.userId, params.date);
  }

  @Get(':id')
  getLog(@Param() params): Promise<Log> {
    return this.logService.getLog(params.id);
  }

  @UsePipes(new JoiValidationPipe(CreateLogSchema))
  @Post()
  create(@Request() req, @Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(req.user.userId, createLogDto);
  }

  @UsePipes(new JoiValidationPipe(UpdateLogSchema))
  @Patch()
  update(@Body() updateLogDto: UpdateLogDto): Promise<Log> {
    return this.logService.update(updateLogDto);
  }

  @Delete(':id')
  delete(@Param() params): Promise<Log> {
    return this.logService.deleteLog(params.id);
  }
}
