import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordUtil } from '../util/password.util';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ENV } from '../util/env.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordUtil: PasswordUtil,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User>> | null {
    try {
      const user: User = await this.userService.findOne(email);
      if (
        user &&
        (await this.passwordUtil.comparePassword(password, user.password))
      ) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      Logger.error(error, 'Validate User');
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    try {
      const payload: { email: string; sub: string } = {
        email: user.email,
        sub: user.password,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: ENV.JWT_SECRET_KEY,
        }),
      };
    } catch (error) {
      Logger.error(error, 'Login');
    }
  }
}
