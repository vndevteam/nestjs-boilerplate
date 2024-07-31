import {
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';

export class CreatePostReqDto {
  @StringField()
  readonly title: string;

  @StringField()
  readonly slug: string;

  @StringFieldOptional()
  readonly description?: string;

  @StringFieldOptional()
  readonly content?: string;
}
