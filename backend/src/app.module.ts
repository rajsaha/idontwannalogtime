import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';
import { LoggerModule } from 'nestjs-pino';
import { LogController } from './modules/log/log.controller';
import { LogModule } from './modules/log/log.module';
import { LogTypeController } from './modules/log-type/log-type.controller';
import { LogTypeModule } from './modules/log-type/log-type.module';
import { LogTypeService } from './modules/log-type/log-type.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gepognc.mongodb.net/test`,
      {
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-timezone'));
          return connection;
        },
      },
    ),
    AuthModule,
    UserModule,
    LogModule,
    LogTypeModule,
  ],
  controllers: [
    UserController,
    AuthController,
    LogController,
    LogTypeController,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly logTypeService: LogTypeService) {}
  async onModuleInit(): Promise<void> {
    await this.logTypeService.seedLogTypes();
  }
}
