import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import {
  CreateUserDto,
  CreateUserSchema,
  LoginSchema,
} from '../user/dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { JoiValidationPipe } from '../util/joi-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UsePipes(new JoiValidationPipe(LoginSchema))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Get('session/health')
  @UseGuards(JwtAuthGuard)
  async sessionHealth(): Promise<{ success: boolean }> {
    try {
      Logger.log(true, 'Session Health');
      return { success: true };
    } catch (error) {
      Logger.error(error);
    }
  }
}
