import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PasswordUtil } from './util/password.util';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gepognc.mongodb.net/test`,
    ),
    AuthModule,
    UserModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, PasswordUtil],
})
export class AppModule {}
