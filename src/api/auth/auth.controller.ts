import { CurrentUser } from '@/decorators/current-user.decorator';
import { Public } from '@/decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Public()
  @Post('login')
  async signIn(@Body() userLogin: LoginReqDto): Promise<LoginResDto> {
    return await this.authService.signIn(userLogin);
  }

  @Public()
  @Post('register')
  async register() {
    return 'register';
  }

  @Post('logout')
  async logout() {
    return 'logout';
  }

  @Public()
  @Post('refresh')
  async refresh() {
    return 'refresh';
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword() {
    return 'forgot-password';
  }

  @Public()
  @Post('reset-password')
  async resetPassword() {
    return 'reset-password';
  }

  @Public()
  @Post('change-password')
  async changePassword() {
    return 'change-password';
  }

  @Public()
  @Post('verify-email')
  async verifyEmail() {
    return 'verify-email';
  }

  @Public()
  @Post('resend-verify-email')
  async resendVerifyEmail() {
    return 'resend-verify-email';
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResDto, description: 'Current user info' })
  getCurrentUser(@CurrentUser() user: UserEntity): UserResDto {
    return user.toDto(UserResDto);
  }
}
