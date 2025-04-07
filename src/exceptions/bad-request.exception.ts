import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.exception';

export default class BadRequestError extends BaseError {
  constructor(messages: string | string[]) {
    super(
      'Bad Request',
      HttpStatus.BAD_REQUEST,
      'The request could not be processed. Please check your input and try again.',
      messages,
    );
  }
}
