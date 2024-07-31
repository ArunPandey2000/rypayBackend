import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    let message = 'Validation failed';

    if (Array.isArray(exceptionResponse.message)) {
      message = exceptionResponse.message.join(', ');
    } else if (exceptionResponse.message) {
      message = exceptionResponse.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
