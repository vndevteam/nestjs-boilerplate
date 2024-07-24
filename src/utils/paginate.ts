import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { PaginationDto } from '@/common/dto/offset-pagination/pagination.dto';
import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
  builder: SelectQueryBuilder<T>,
  pageOptionsDto: PageOptionsDto,
  options?: Partial<{
    skipCount: boolean;
    takeAll: boolean;
  }>,
): Promise<[T[], PaginationDto]> {
  if (!options?.takeAll) {
    builder.skip(pageOptionsDto.offset).take(pageOptionsDto.limit);
  }

  const entities: T[] = await builder.getMany();

  let count = -1;

  if (!options?.skipCount) {
    count = await builder.getCount();
  }

  const metaDto = new PaginationDto(count, pageOptionsDto);

  return [entities, metaDto];
}
