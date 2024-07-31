import {
  DateField,
  StringField,
  StringFieldOptional,
  UUIDField,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResDto {
  @UUIDField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  title: string;

  @StringField()
  @Expose()
  slug: string;

  @StringFieldOptional()
  @Expose()
  description?: string;

  @StringFieldOptional()
  @Expose()
  content?: string;

  @StringField()
  @Expose()
  createdBy: string;

  @StringField()
  @Expose()
  updatedBy: string;

  @DateField()
  @Expose()
  createdAt: Date;

  @DateField()
  @Expose()
  updatedAt: Date;
}
