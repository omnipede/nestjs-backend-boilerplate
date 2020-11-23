import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 형식에 맞춰서 response body 를 바꾸는 인터셉터
 */
@Injectable()
export class ResponseBodyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseBodyInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) : Observable<any> {
    const host = context.switchToHttp();
    const response = host.getResponse<Response>();

    const { dataToResponseBody } = this;

    return next.handle().pipe(
      map(data => dataToResponseBody(response, data)),
    );
  }

  /**
   * 인터셉터로 넘어온 데이터를 response body 로 만드는 함수
   * @param response Server response
   * @param data Data from previous handle
   */
  private dataToResponseBody(response: Response, data: any): any {
    const { statusCode } = response;
    return {
      status: statusCode,
      data,
    }
  }
}
