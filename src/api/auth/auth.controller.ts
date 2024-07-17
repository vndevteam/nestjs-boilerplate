import { CurrentUser } from '@/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from '@/decorators/http.decorators';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResDto } from '../user/dto/user.res.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiPublic({
    type: LoginResDto,
    summary: 'Sign in',
  })
  @Post('login')
  async signIn(@Body() userLogin: LoginReqDto): Promise<LoginResDto> {
    return await this.authService.signIn(userLogin);
  }

  @ApiPublic()
  @Post('register')
  async register() {
    return 'register';
  }

  @Post('logout')
  async logout() {
    return 'logout';
  }

  @ApiPublic()
  @Post('refresh')
  async refresh() {
    return 'refresh';
  }

  @ApiPublic()
  @Post('forgot-password')
  async forgotPassword() {
    return 'forgot-password';
  }

  @ApiPublic()
  @Post('reset-password')
  async resetPassword() {
    return 'reset-password';
  }

  @ApiPublic()
  @Post('change-password')
  async changePassword() {
    return 'change-password';
  }

  @ApiPublic()
  @Post('verify-email')
  async verifyEmail() {
    return 'verify-email';
  }

  @ApiPublic()
  @Post('resend-verify-email')
  async resendVerifyEmail() {
    return 'resend-verify-email';
  }

  @ApiAuth({
    type: UserResDto,
    summary: 'Get current user',
  })
  @Get('me')
  getCurrentUser(@CurrentUser() user: UserEntity): UserResDto {
    return user.toDto(UserResDto);
  }
}
