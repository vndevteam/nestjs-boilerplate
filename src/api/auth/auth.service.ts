import { AllConfigType } from '@/config/config.type';
import { verifyPassword } from '@/utils/password.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import ms from 'ms';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';

type Token = {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Sign in user
   * @param dto LoginReqDto
   * @returns LoginResDto
   */
  async signIn(dto: LoginReqDto): Promise<LoginResDto> {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    const isPasswordValid =
      user && (await verifyPassword(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.createToken(user);

    return plainToInstance(LoginResDto, {
      userId: user.id,
      ...token,
    });
  }

  async verifyAccessToken(accessToken: string): Promise<UserEntity> {
    let email: string;
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
      });

      email = payload.email;
    } catch {
      throw new UnauthorizedException();
    }

    return await this.userRepository.findOneByOrFail({ email });
  }

  private async createToken(user: UserEntity): Promise<Token> {
    const payload = { sub: user.id, email: user.email };
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      }),
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
      }),
    ]);
    return {
      accessToken,
      refreshToken,
      tokenExpires,
    } as Token;
  }
}
