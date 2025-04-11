import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.exception';

export default class NotFoundError extends BaseError {
  constructor(resource: string, identifier: number | string) {
    super(
      HttpStatus.NOT_FOUND,
      {
        [resource]: [
          `${resource} with identifier '${identifier}' was not found`,
        ],
      },
      'The resource you requested could not be found.',
    );
  }
}
