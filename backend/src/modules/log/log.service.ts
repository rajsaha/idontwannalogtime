import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../../schemas/log.schema';
import mongoose, { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LOG_TIME_PATTERN } from '../../constants/regex.constant';
import { calculateMinutes } from '../../util/time-spent.util';
import * as dayjs from 'dayjs';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(userId: string, createLogDto: CreateLogDto): Promise<Log> {
    try {
      const regexArray: Array<string> = LOG_TIME_PATTERN.exec(
        createLogDto.timeSpentInPlainEnglish,
      );

      const timeSpent = calculateMinutes(regexArray);
      const canAddLog = await this.getTimeSpentForDate(
        userId,
        createLogDto.date,
        timeSpent,
      );

      if (!canAddLog) {
        throw new BadRequestException('Time spent cannot exceed 24 hours!');
      }

      const createdLog = new this.logModel({
        workedOn: createLogDto.workedOn,
        timeSpentInPlainEnglish: createLogDto.timeSpentInPlainEnglish,
        timeSpent: timeSpent,
        logType: createLogDto.logType,
        userId: userId,
        date: createLogDto.date,
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
      return this.logModel.findByIdAndUpdate(
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
    return this.logModel.findById(_id);
  }

  async getLogsAtDate(userId: string, date: string): Promise<Log[]> {
    try {
      const currentDate: dayjs.Dayjs = dayjs(date);
      const nextDate: dayjs.Dayjs = dayjs(currentDate).add(1, 'day');
      return this.logModel.aggregate([
        {
          $lookup: {
            from: 'logtypes',
            localField: 'logType',
            foreignField: '_id',
            as: 'logTypes',
          },
        },
        {
          $unwind: {
            path: '$logTypes',
          },
        },
        {
          $match: {
            date: {
              $gte: currentDate.toDate(),
              $lt: nextDate.toDate(),
            },
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $project: {
            _id: 1,
            workedOn: 1,
            timeSpent: 1,
            timeSpentInPlainEnglish: 1,
            logType: '$logTypes._id',
            logTypeDescription: '$logTypes.description',
            date: 1,
            userId: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
    } catch (error) {
      Logger.error(error, 'Get Logs At Date');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async deleteLog(_id: string): Promise<Log> {
    try {
      return this.logModel.findByIdAndDelete(_id);
    } catch (error) {
      Logger.error(error, 'Delete Log');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async getTimeSpentForDate(
    userId: string,
    date: string,
    newLogTimeSpent: number,
  ): Promise<boolean> {
    const logs: Array<Log> = await this.getLogsAtDate(userId, date);
    let tally = 0;
    logs.forEach((log) => {
      tally += log.timeSpent;
    });

    if (tally + newLogTimeSpent > 1440) {
      return false;
    }

    return true;
  }
}
