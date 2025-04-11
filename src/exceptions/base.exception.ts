import { HttpStatus, HttpException } from '@nestjs/common';

export class BaseError extends HttpException {
  constructor(
    status: HttpStatus,
    details: Record<string, string[]>,
    message: string,
  ) {
    super(
      {
        message,
        details,
      },
      status,
    );
  }
}
