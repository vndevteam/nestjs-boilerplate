import { DEFAULT_CURRENT_PAGE } from '@/constants/app.constant';
import { ListUserSort } from '@/constants/sort.enum';
import {
  NumberFieldOptional,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { IsEnum } from 'class-validator';
import { PageOptions } from '../page-options';

export class PageBasedOptions extends PageOptions {
  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_CURRENT_PAGE,
    int: true,
  })
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  @StringFieldOptional()
  @IsEnum(ListUserSort)
  readonly orderBy?: string;

  get offset() {
    return this.page ? (this.page - 1) * this.limit : 0;
  }
}
