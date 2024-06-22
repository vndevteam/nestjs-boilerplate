import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorDetailDto } from './error-detail.dto';

export class ErrorDto {
  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiPropertyOptional()
  errorCode?: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional({ type: ErrorDetailDto, isArray: true })
  details?: ErrorDetailDto[];

  @ApiPropertyOptional()
  stack?: string;

  @ApiPropertyOptional({ type: Error })
  trace?: Error | unknown;
}
