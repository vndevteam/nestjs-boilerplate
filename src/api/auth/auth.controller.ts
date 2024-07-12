import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResDto } from '../user/dto/user.res.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    console.log('UserLoginDto', userLogin);
    return 'login';
  }

  @Post('register')
  async register() {
    return 'register';
  }

  @Post('logout')
  async logout() {
    return 'logout';
  }

  @Post('refresh')
  async refresh() {
    return 'refresh';
  }

  @Post('forgot-password')
  async forgotPassword() {
    return 'forgot-password';
  }

  @Post('reset-password')
  async resetPassword() {
    return 'reset-password';
  }

  @Post('change-password')
  async changePassword() {
    return 'change-password';
  }

  @Post('verify-email')
  async verifyEmail() {
    return 'verify-email';
  }

  @Post('resend-verify-email')
  async resendVerifyEmail() {
    return 'resend-verify-email';
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getCurrentUser(user: UserEntity): UserResDto {
    return user.toDto(UserResDto);
  }
}
