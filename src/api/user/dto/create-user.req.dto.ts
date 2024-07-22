import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';

export class CreateUserReqDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @EmailField()
  readonly email: string;

  @PasswordField()
  readonly password: string;

  @StringFieldOptional()
  readonly bio?: string;

  @StringFieldOptional()
  readonly image?: string;
}
