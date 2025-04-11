import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.exception';

export default class BadRequestError extends BaseError {
  constructor(details: Record<string, string[]>) {
    super(
      HttpStatus.BAD_REQUEST,
      details,
      'The request could not be processed.',
    );
  }
}
