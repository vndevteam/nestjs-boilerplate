import { EmailField, PasswordField } from '@/decorators/field.decorators';

export class UserLoginDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: number;
}
