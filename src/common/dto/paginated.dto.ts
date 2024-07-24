import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class PaginatedDto<TData> {
  @ApiProperty({ type: [Object] })
  @Expose()
  readonly data: TData[];

  @ApiProperty()
  @Expose()
  pagination: PaginationDto;

  constructor(data: TData[], meta: PaginationDto) {
    this.data = data;
    this.pagination = meta;
  }
}
