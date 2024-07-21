import { TokenField } from '@/decorators/field.decorators';

export class RefreshReqDto {
  @TokenField()
  refreshToken!: string;
}
