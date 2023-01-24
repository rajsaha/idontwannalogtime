import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user: Partial<User> = await this.authService.validateUser(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
