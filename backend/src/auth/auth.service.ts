import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordUtil } from '../util/password.util';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordUtil: PasswordUtil,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> | null {
    const user: User = await this.userService.findOne(username);
    if (
      user &&
      (await this.passwordUtil.comparePassword(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload: { username: string; sub: mongoose.Types.ObjectId } = {
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
