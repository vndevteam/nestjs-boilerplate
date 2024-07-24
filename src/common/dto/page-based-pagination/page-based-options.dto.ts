import { DEFAULT_CURRENT_PAGE } from '@/constants/app.constant';
import { NumberFieldOptional } from '@/decorators/field.decorators';
import { PageOptionsDto } from '../page-options.dto';

export class PageBasedOptionsDto extends PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_CURRENT_PAGE,
    int: true,
  })
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  get offset() {
    return this.page ? (this.page - 1) * this.limit : 0;
  }
}
