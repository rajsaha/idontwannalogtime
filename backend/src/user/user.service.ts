import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordUtil } from '../util/password.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private passwordUtil: PasswordUtil,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await this.passwordUtil.hashPassword(
        createUserDto.password,
      );
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (err) {
      Logger.error(err, 'Create User');
    }
  }

  async findOne(username: string): Promise<User> {
    try {
      return this.userModel.findOne({ username });
    } catch (error) {
      Logger.error(error, 'Find one user');
    }
  }
}
