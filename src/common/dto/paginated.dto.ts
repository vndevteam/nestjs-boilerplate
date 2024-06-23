import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { Expose } from 'class-transformer';

export class PaginatedDto<TData> {
  @ApiProperty({ type: [Object] })
  @Expose()
  data: TData[];

  @ApiProperty()
  @Expose()
  pagination: PaginationDto;

  constructor(data: TData[], meta: PaginationDto) {
    this.data = data;
    this.pagination = meta;
  }
}
