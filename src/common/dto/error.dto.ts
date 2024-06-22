import { ErrorDetailDto } from './error-detail.dto';

export class ErrorDto {
  timestamp: string;
  statusCode: number;
  error: string;
  message: string;
  details?: ErrorDetailDto[];
  stack?: string;
  trace?: Error | unknown;
}
