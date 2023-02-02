import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../schemas/log.schema';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LOG_TIME_PATTERN } from '../constants/regex.constant';
import { calculateMinutes } from '../util/time-spent.util';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Kuala_Lumpur');

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(userId: string, createLogDto: CreateLogDto): Promise<Log> {
    try {
      const regexArray: Array<string> = LOG_TIME_PATTERN.exec(
        createLogDto.timeSpentInPlainEnglish,
      );
      const createdLog = new this.logModel({
        workedOn: createLogDto.workedOn,
        timeSpentInPlainEnglish: createLogDto.timeSpentInPlainEnglish,
        timeSpent: calculateMinutes(regexArray),
        logType: createLogDto.logType,
        userId: userId,
      });
      await this.logModel.init();
      return createdLog.save();
    } catch (error) {
      Logger.error(error.message, 'Create Log');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async update(updateLogDto: UpdateLogDto): Promise<Log> {
    try {
      const existingLog = await this.getLog(updateLogDto._id);
      if (!existingLog) {
        throw new HttpException('Log does not exist', HttpStatus.NOT_FOUND);
      }
      const regexArray: Array<string> = LOG_TIME_PATTERN.exec(
        updateLogDto.timeSpentInPlainEnglish,
      );
      return await this.logModel.findByIdAndUpdate(
        updateLogDto._id,
        {
          $set: {
            workedOn: updateLogDto.workedOn,
            timeSpentInPlainEnglish: updateLogDto.timeSpentInPlainEnglish,
            timeSpent: calculateMinutes(regexArray),
            logType: updateLogDto.logType,
          },
        },
        { new: true },
      );
    } catch (error) {
      Logger.error(error.message, 'Update Log');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async getLog(_id: string): Promise<Log> {
    return this.logModel.findOne({ id: _id });
  }

  async getLogsForAtDate(userId: string, date: string): Promise<Log[]> {
    const offset: number = dayjs(date).utcOffset();
    const currentDate: dayjs.Dayjs = dayjs(date)
      .tz('Asia/Kuala_Lumpur')
      .add(offset, 'minutes');
    const nextDate: dayjs.Dayjs = dayjs(currentDate).add(1, 'day');
    return this.logModel.find({
      createdAt: {
        $gte: currentDate.format('YYYY-MM-DD'),
        $lte: nextDate.format('YYYY-MM-DD'),
      },
      userId: userId,
    });
  }
}
