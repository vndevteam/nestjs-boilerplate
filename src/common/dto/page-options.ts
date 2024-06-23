import { DEFAULT_PAGE_LIMIT, Direction } from '@/constants/app.constant';
import { IsBothOrNonePresent } from '@/decorators/validators/is-both-or-none-present.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export abstract class PageOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly limit?: number = DEFAULT_PAGE_LIMIT;

  @ApiPropertyOptional()
  @IsOptional()
  readonly q?: string;

  @ApiPropertyOptional({ enum: Direction })
  @IsEnum(Direction)
  @IsOptional()
  @IsBothOrNonePresent('orderBy')
  readonly order?: Direction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBothOrNonePresent('order')
  readonly orderBy?: string;
}
