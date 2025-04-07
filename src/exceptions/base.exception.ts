import { HttpStatus, HttpException } from "@nestjs/common";

export class BaseError extends HttpException {
    constructor(
      title: string,
      status: HttpStatus,
      detail: string,
      messages: string | string[] | { message: string }[]
    ) {
      let errors: { message: string }[];
      
      if (typeof messages === 'string') {
        errors = [{ message: messages }];
      } else if (Array.isArray(messages) && messages.length > 0) {
        if (typeof messages[0] === 'string') {
          errors = (messages as string[]).map(message => ({ message }));
        } else {
          errors = messages as { message: string }[];
        }
      } else {
        errors = [];
      }
  
      super(
        {
          title,
          status,
          detail,
          errors
        },
        status
      );
    }
  }
  