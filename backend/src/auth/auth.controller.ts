import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('session/health')
  @UseGuards(JwtAuthGuard)
  async sessionHealth() {
    try {
      Logger.log(true, 'Session Health');
      return { success: true };
    } catch (error) {
      Logger.error(error);
    }
  }
}
