import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogType } from '../schemas/log-type.schema';
import { Model } from 'mongoose';
import { CreateLogTypeDto } from './dto/create-log-type.dto';
import { UpdateLogTypeDto } from './dto/update-log-type.dto';

@Injectable()
export class LogTypeService {
  private logTypes: LogType[] = [
    {
      description: 'Development',
      backgroundColor: '',
      color: '',
    },
    {
      description: 'Meeting',
      backgroundColor: '',
      color: '',
    },
    {
      description: 'Technical Design',
      backgroundColor: '',
      color: '',
    },
    {
      description: 'Testing',
      backgroundColor: '',
      color: '',
    },
  ];
  constructor(
    @InjectModel(LogType.name) private logTypeModel: Model<LogType>,
  ) {}

  async create(createLogTypeDto: CreateLogTypeDto): Promise<LogType> {
    try {
      const createdLogType = new this.logTypeModel(createLogTypeDto);
      await this.logTypeModel.init();
      return createdLogType.save();
    } catch (error) {
      Logger.error(error.message, 'Create Log Type');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async update(updateLogTypeDto: UpdateLogTypeDto): Promise<LogType> {
    try {
      const existingLogType = await this.getLogType(updateLogTypeDto._id);
      if (!existingLogType) {
        throw new HttpException(
          'Log type does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.logTypeModel.findByIdAndUpdate(
        { id: updateLogTypeDto._id },
        {
          $set: {
            description: updateLogTypeDto.description,
            backgroundColor: updateLogTypeDto.backgroundColor,
            color: updateLogTypeDto.color,
          },
        },
      );
    } catch (error) {
      Logger.error(error.message, 'Update Log Type');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async getLogType(_id: string): Promise<LogType> {
    return this.logTypeModel.findOne({ id: _id });
  }

  async seedLogTypes(): Promise<void> {
    try {
      const existingLogTypes = await this.logTypeModel.find();
      if (Array.isArray(existingLogTypes) && existingLogTypes.length > 0) {
        return null;
      }
      await this.logTypeModel.insertMany(this.logTypes);
    } catch (error) {
      Logger.error(error.message, 'Log Type Seeding');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }
}
