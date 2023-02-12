import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordUtil } from '../../util/password.util';
import { User } from '../../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordUtil: PasswordUtil,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> | null {
    try {
      const user: User = await this.userService.findOne(email);
      if (
        user &&
        (await this.passwordUtil.comparePassword(password, user.password))
      ) {
        return user;
      }
      return null;
    } catch (error) {
      Logger.error(error, 'Validate User');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    try {
      const payload: { sub: string } = {
        sub: user._id.toString(),
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: '180d',
        }),
      };
    } catch (error) {
      Logger.error(error, 'Login');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error.message),
      });
    }
  }
}
