import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LOG_TYPE_CREATED_BY, LogType } from '../../schemas/log-type.schema';
import { Model } from 'mongoose';
import { CreateLogTypeDto } from './dto/create-log-type.dto';
import { UpdateLogTypeDto } from './dto/update-log-type.dto';
import { Dropdown } from '../../interfaces/dropdown.interface';

@Injectable()
export class LogTypeService {
  private logTypes: LogType[] = [
    {
      description: 'Development',
      backgroundColor: '',
      color: '',
      createdBy: LOG_TYPE_CREATED_BY.SYSTEM,
      isDeleted: false,
    },
    {
      description: 'Meeting',
      backgroundColor: '',
      color: '',
      createdBy: LOG_TYPE_CREATED_BY.SYSTEM,
      isDeleted: false,
    },
    {
      description: 'Technical Design',
      backgroundColor: '',
      color: '',
      createdBy: LOG_TYPE_CREATED_BY.SYSTEM,
      isDeleted: false,
    },
  ];
  constructor(
    @InjectModel(LogType.name) private logTypeModel: Model<LogType>,
  ) {}

  async create(
    userId: string,
    createLogTypeDto: CreateLogTypeDto,
  ): Promise<LogType> {
    try {
      const createdLogType = new this.logTypeModel({
        ...createLogTypeDto,
        createdBy: LOG_TYPE_CREATED_BY.USER,
        userId: userId,
      });
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
      return this.logTypeModel.findByIdAndUpdate(updateLogTypeDto._id, {
        $set: {
          description: updateLogTypeDto.description,
          backgroundColor: updateLogTypeDto.backgroundColor,
          color: updateLogTypeDto.color,
        },
      });
    } catch (error) {
      Logger.error(error.message, 'Update Log Type');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async getLogType(_id: string): Promise<LogType> {
    try {
      return this.logTypeModel.findById(_id);
    } catch (error) {
      Logger.error(error.message, 'Get Log Type');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async getLogTypes(userId: string): Promise<Dropdown[]> {
    try {
      const logTypes: LogType[] = await this.logTypeModel.find({
        $or: [{ userId: userId }, { createdBy: LOG_TYPE_CREATED_BY.SYSTEM }],
        $and: [{ isDeleted: false }],
      });
      return logTypes.map((logType) => {
        return {
          value: logType._id,
          label: logType.description,
          createdBy: logType.createdBy,
        };
      });
    } catch (error) {
      Logger.error(error.message, 'Get Log Types');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async deleteLogType(_id: string): Promise<LogType> {
    try {
      return this.logTypeModel.findByIdAndUpdate(_id, {
        $set: {
          isDeleted: true,
        },
      });
    } catch (error) {
      Logger.error(error.message, 'Delete Log Type');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
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
