import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../schemas/log.schema';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const createdLog = new this.logModel(createLogDto);
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
      return await this.logModel.findByIdAndUpdate(
        { id: updateLogDto._id },
        {
          $set: {
            workedOn: updateLogDto.workedOn,
            timeSpent: updateLogDto.timeSpent,
            logType: updateLogDto.logType,
          },
        },
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
}
