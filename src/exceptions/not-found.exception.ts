import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.exception';

export default class NotFoundError extends BaseError {
  constructor(resource: string, identifier: number | string) {
    super(
      'Not Found',
      HttpStatus.NOT_FOUND,
      'The resource you requested could not be found.',
      `${resource} with identifier '${identifier}' was not found`,
    );
  }
}
