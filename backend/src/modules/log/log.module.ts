import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserService } from '../user/user.service';
import { LogService } from './log.service';
import { Log, LogSchema } from '../../schemas/log.schema';
import { LogType, LogTypeSchema } from '../../schemas/log-type.schema';
import { LogController } from './log.controller';
import { PasswordUtil } from '../../util/password.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Log.name, schema: LogSchema },
      { name: LogType.name, schema: LogTypeSchema },
    ]),
  ],
  providers: [UserService, LogService, PasswordUtil],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}
