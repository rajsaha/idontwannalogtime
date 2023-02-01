import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../schemas/log.schema';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LOG_TIME_PATTERN } from '../constants/regex.constant';
import { calculateMinutes } from '../util/time-spent.util';
import { GetLogsAtDateDto } from './dto/get-logs-at-date.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const regexArray: Array<string> = LOG_TIME_PATTERN.exec(
        createLogDto.timeSpent,
      );
      const createdLog = new this.logModel({
        workedOn: createLogDto.workedOn,
        timeSpent: calculateMinutes(regexArray),
        logType: createLogDto.logType,
        userId: createLogDto.userId,
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
        updateLogDto.timeSpent,
      );
      return await this.logModel.findByIdAndUpdate(
        updateLogDto._id,
        {
          $set: {
            workedOn: updateLogDto.workedOn,
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
    console.log(userId, date);
    // const currentDate: dayjs.Dayjs = dayjs(getLogsAtDate.date);
    // const nextDate: dayjs.Dayjs = dayjs(getLogsAtDate.date).add(1, 'day');
    // return this.logModel.find({
    //   createdAt: {
    //     $gte: new Date('2023-01-01'),
    //     $lte: new Date('2023-03-01'),
    //   },
    //   userId: getLogsAtDate.userId,
    // });
    return null;
  }

  getPrettifiedTime(timeSpent: number): string {
    if (timeSpent <= 59) {
      return timeSpent.toString().concat('m');
    }

    const hours = (timeSpent / 60).toFixed(0);
    const minutes = timeSpent % 60;

    return `${hours}h ${minutes}m`;
  }
}
