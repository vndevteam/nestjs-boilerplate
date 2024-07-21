import { EmailField, PasswordField } from '@/decorators/field.decorators';

export class RegisterReqDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
