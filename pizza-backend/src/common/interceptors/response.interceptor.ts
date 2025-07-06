import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data === undefined || data === null) {
          return {
            Success: true,
            Message: 'Operation successful',
          };
        }

        if ('Success' in data) {
          return data;
        }

        return {
          Success: true,
          Message: 'Operation successful',
          Data: data,
        };
      }),
      catchError((err) => {
        console.error('Error in interceptor:', err);

        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const response =
          err instanceof HttpException
            ? err.getResponse()
            : { message: 'An unexpected error occurred' };

        const errorResponse = {
          Success: false,
          Message: 'Failed to process request',
          Error: {
            Code: statusCode,
            Message:
              typeof response === 'string'
                ? response
                : (response as any).message || 'An error occurred',
          },
        };

        return throwError(() => {
          new HttpException(errorResponse, statusCode);
        });
      }),
    );
  }
}
