import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorDetailDto {
  @ApiPropertyOptional()
  property: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}
