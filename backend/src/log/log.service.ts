import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../schemas/log.schema';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LOG_TIME_PATTERN } from '../constants/regex.constant';

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
        timeSpent: this.calculateMinutes(regexArray),
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
            timeSpent: this.calculateMinutes(regexArray),
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

  calculateMinutes(regexArray: Array<string>): number {
    let minutes = 0;

    // Early return if minute appear earlier in the array
    if (regexArray[2].charAt(0) === 'm') {
      return minutes + parseInt(regexArray[1]);
    }

    // Tally minutes if value at index not undefined
    if (regexArray[4] !== undefined) {
      minutes += parseInt(regexArray[4]);
    }

    // Convert hours into minutes
    // Example: 2 --> 120
    if (regexArray[1]) {
      minutes += parseInt(regexArray[1]) * 60;
    }

    return minutes;
  }
}
