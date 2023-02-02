import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordUtil } from '../../util/password.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private passwordUtil: PasswordUtil,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const isExistingUser: User = await this.findOne(createUserDto.email);
      if (isExistingUser) {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      }
      createUserDto.password = await this.passwordUtil.hashPassword(
        createUserDto.password,
      );
      const createdUser = new this.userModel(createUserDto);
      await this.userModel.init();
      return createdUser.save();
    } catch (error) {
      Logger.error(error.message, 'Create User');
      throw new HttpException(error.message, HttpStatus.FORBIDDEN, {
        cause: new Error(error.message),
      });
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      Logger.error(error, 'Find one user');
    }
  }
}
