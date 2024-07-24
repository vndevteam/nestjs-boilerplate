import { PageBasedOptionsDto } from '@/common/dto/page-based-pagination/page-based-options.dto';
import { PageBasedPaginationDto } from '@/common/dto/page-based-pagination/page-based-pagination.dto';
import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
  builder: SelectQueryBuilder<T>,
  pageOptionsDto: PageBasedOptionsDto,
  options?: Partial<{
    skipCount: boolean;
    takeAll: boolean;
  }>,
): Promise<[T[], PageBasedPaginationDto]> {
  if (!options?.takeAll) {
    builder.skip(pageOptionsDto.offset).take(pageOptionsDto.limit);
  }

  const entities: T[] = await builder.getMany();

  let count = -1;

  if (!options?.skipCount) {
    count = await builder.getCount();
  }

  const metaDto = new PageBasedPaginationDto(count, pageOptionsDto);

  return [entities, metaDto];
}
