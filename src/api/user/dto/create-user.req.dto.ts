import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
}
