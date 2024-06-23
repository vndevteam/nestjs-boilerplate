import { type TransformFnParams } from 'class-transformer';

export const lowerCaseTransformer = (params: TransformFnParams): string =>
  params.value?.toLowerCase().trim();
