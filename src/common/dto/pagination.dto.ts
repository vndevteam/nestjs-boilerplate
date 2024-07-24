import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PageOptionsDto } from './page-options.dto';

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

  constructor(totalRecords: number, pageOptions: PageOptionsDto) {
    this.totalRecords = totalRecords;
    this.limit = pageOptions.limit;
    this.totalPages =
      this.limit > 0 ? Math.ceil(totalRecords / pageOptions.limit) : 0;
  }
}
