import { ArgumentsHost, BadRequestException, ExceptionFilter } from '@nestjs/common';
export declare class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void;
}
