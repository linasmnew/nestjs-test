import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
 
interface HttpErrorResponse extends HttpException {
  title: string;
  detail: string;
  errors: { message: string }[];
}
 
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpErrorResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
 
    response.status(status).json((exception.getResponse() as HttpErrorResponse));
  }
}
