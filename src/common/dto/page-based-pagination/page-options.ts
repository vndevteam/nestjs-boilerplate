import { DEFAULT_CURRENT_PAGE } from '@/constants/app.constant';
import { ListUserSort } from '@/constants/sort.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { PageOptions } from '../page-options';

export class PageBasedOptions extends PageOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  @ApiPropertyOptional({ enum: ListUserSort })
  @IsEnum(ListUserSort)
  declare orderBy?: string;

  get offset() {
    return this.page ? (this.page - 1) * this.limit : 0;
  }
}
