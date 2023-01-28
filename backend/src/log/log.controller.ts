import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Log } from '../schemas/log.schema';
import { UpdateLogDto } from './dto/update-log.dto';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('log')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private logService: LogService) {}

  @Get(':id')
  getLog(@Param() params): Promise<Log> {
    return this.logService.getLog(params.id);
  }

  @Post()
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(createLogDto);
  }

  @Patch()
  update(@Body() updateLogDto: UpdateLogDto): Promise<Log> {
    return this.logService.update(updateLogDto);
  }
}
