import { OmitType } from '@nestjs/swagger';
import { CreateUserReqDto } from './create-user.req.dto';

export class UpdateUserReqDto extends OmitType(CreateUserReqDto, [
  'username',
  'email',
  'password',
] as const) {}
