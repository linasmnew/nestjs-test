import { HttpStatus, HttpException } from '@nestjs/common';

export class BaseError extends HttpException {
  constructor(status: HttpStatus, details: string | object, message: string) {
    super(
      {
        message,
        details,
      },
      status,
    );
  }
}
