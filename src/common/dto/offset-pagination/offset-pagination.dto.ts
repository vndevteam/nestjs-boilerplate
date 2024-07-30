import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PageOptionsDto } from './page-options.dto';

export class OffsetPaginationDto {
  @ApiProperty()
  @Expose()
  readonly limit: number;

  @ApiProperty()
  @Expose()
  readonly currentPage: number;

  @ApiProperty()
  @Expose()
  readonly nextPage?: number;

  @ApiProperty()
  @Expose()
  readonly previousPage?: number;

  @ApiProperty()
  @Expose()
  readonly totalRecords: number;

  @ApiProperty()
  @Expose()
  readonly totalPages: number;

  constructor(totalRecords: number, pageOptions: PageOptionsDto) {
    this.limit = pageOptions.limit;
    this.currentPage = pageOptions.page;
    this.nextPage =
      this.currentPage < this.totalPages ? this.currentPage + 1 : undefined;
    this.previousPage =
      this.currentPage > 1 && this.currentPage - 1 < this.totalPages
        ? this.currentPage - 1
        : undefined;
    this.totalRecords = totalRecords;
    this.totalPages =
      this.limit > 0 ? Math.ceil(totalRecords / pageOptions.limit) : 0;
  }
}
