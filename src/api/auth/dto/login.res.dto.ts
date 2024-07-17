import { NumberField, StringField } from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResDto {
  @Expose()
  @NumberField()
  userId!: number;

  @Expose()
  @StringField()
  accessToken!: string;

  @Expose()
  @StringField()
  refreshToken!: string;

  @Expose()
  @NumberField()
  tokenExpires!: number;
}
