import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(lowerCaseTransformer)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiPropertyOptional()
  @Allow()
  readonly bio?: string;

  @ApiPropertyOptional()
  @Allow()
  readonly image?: string;
}
