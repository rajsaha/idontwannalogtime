import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PasswordUtil } from '../util/password.util';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    PassportModule,
    PasswordUtil,
    LocalStrategy,
    JwtService,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
