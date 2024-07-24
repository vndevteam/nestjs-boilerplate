import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationDto } from '../pagination.dto';
import { PageBasedOptions } from './page-based-options';

export class PageBasedPaginationDto extends PaginationDto {
  @ApiProperty()
  @Expose()
  readonly currentPage: number;

  @ApiProperty()
  @Expose()
  readonly nextPage?: number;

  @ApiProperty()
  @Expose()
  readonly previousPage?: number;

  constructor(totalRecords: number, pageOptions: PageBasedOptions) {
    super(totalRecords, pageOptions);
    this.currentPage = pageOptions.page;
    this.nextPage =
      this.currentPage < this.totalPages ? this.currentPage + 1 : undefined;
    this.previousPage =
      this.currentPage > 1 && this.currentPage - 1 < this.totalPages
        ? this.currentPage - 1
        : undefined;
  }
}
