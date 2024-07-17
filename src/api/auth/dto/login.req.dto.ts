import { EmailField, PasswordField } from '@/decorators/field.decorators';

export class LoginReqDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
