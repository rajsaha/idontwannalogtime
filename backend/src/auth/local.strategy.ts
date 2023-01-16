import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    const user: Partial<User> = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
