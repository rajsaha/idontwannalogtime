import {
  Body,
  Controller,
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
import { Log } from '../schemas/log.schema';
import { UpdateLogDto, UpdateLogSchema } from './dto/update-log.dto';
import { CreateLogDto, CreateLogSchema } from './dto/create-log.dto';
import { JoiValidationPipe } from '../util/joi-validation.pipe';
import {
  GetLogsAtDateDto,
  GetLogsAtDateSchema,
} from './dto/get-logs-at-date.dto';

@Controller('log')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private logService: LogService) {}

  @Get('at-date/:date')
  getLogsAtDate(
    @Request() req,
    @Param() params: GetLogsAtDateDto,
  ): Promise<Log[]> {
    return this.logService.getLogsForAtDate(req.user.userId, params.date);
  }

  @Get(':id')
  getLog(@Param() params): Promise<Log> {
    return this.logService.getLog(params.id);
  }

  @UsePipes(new JoiValidationPipe(CreateLogSchema))
  @Post()
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(createLogDto);
  }

  @UsePipes(new JoiValidationPipe(UpdateLogSchema))
  @Patch()
  update(@Body() updateLogDto: UpdateLogDto): Promise<Log> {
    return this.logService.update(updateLogDto);
  }
}
