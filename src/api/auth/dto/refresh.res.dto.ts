import { NumberField, StringField } from '@/decorators/field.decorators';

export class RefreshResDto {
  @StringField()
  accessToken!: string;

  @StringField()
  refreshToken!: string;

  @NumberField()
  tokenExpires!: number;
}
