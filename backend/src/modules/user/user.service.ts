import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User, UserDocument } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordUtil } from '../../util/password.util';
import { UpdatePasswordDto } from './dto/update-password.dto';

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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async findUserById(userId: string): Promise<User> {
    try {
      return this.userModel.findById(userId);
    } catch (error) {
      Logger.error(error, 'Find one user');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    try {
      const user: User = await this.findUserById(userId);
      const isCurrentPasswordCorrect = await this.passwordUtil.comparePassword(
        updatePasswordDto.password,
        user.password,
      );
      console.log('Is current password correct: ' + isCurrentPasswordCorrect);

      if (!isCurrentPasswordCorrect) {
        throw new BadRequestException('Current password incorrect');
      }

      if (
        updatePasswordDto.newPassword !== updatePasswordDto.confirmNewPassword
      ) {
        throw new BadRequestException("Passwords don't match");
      }

      const hashedPassword = await this.passwordUtil.hashPassword(
        updatePasswordDto.newPassword,
      );

      console.log('Hashed Password: ' + hashedPassword);

      return this.userModel.findByIdAndUpdate(userId, {
        $set: {
          password: hashedPassword,
        },
      });
    } catch (error) {
      Logger.error(error, 'Change Password');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }
}
