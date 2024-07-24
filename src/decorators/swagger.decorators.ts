import { PaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { type Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  type ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiPaginatedResponse = <T extends Type<any>>(options: {
  type: T;
  description?: string;
}): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, options.type),
    ApiOkResponse({
      description:
        options.description || `Paginated list of ${options.type.name}`,
      schema: {
        title: `PaginatedResponseOf${options.type.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    } as ApiResponseOptions | undefined),
  );
};
