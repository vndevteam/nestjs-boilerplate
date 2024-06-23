import { ApiProperty } from '@nestjs/swagger';
import { PageOptions } from './page-options';
import { Expose } from 'class-transformer';
import { DEFAULT_PAGE_LIMIT } from '@/constants/app.constant';

export abstract class PaginationDto {
  @ApiProperty()
  @Expose()
  readonly totalRecords: number;

  @ApiProperty()
  @Expose()
  readonly totalPages: number;

  @ApiProperty()
  @Expose()
  readonly limit: number;

  constructor(totalRecords: number, pageOptions: PageOptions) {
    this.totalRecords = totalRecords;
    this.limit =
      pageOptions.limit >= 0 ? pageOptions.limit : DEFAULT_PAGE_LIMIT;
    this.totalPages =
      this.limit > 0 ? Math.ceil(totalRecords / pageOptions.limit) : 0;
  }
}
