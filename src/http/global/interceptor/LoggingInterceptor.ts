import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Request, response 를 로깅하는 인터셉터
 * @deprecated
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) : Observable<any> {
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const response = host.getResponse<Response>();
    // 시간 측정 시작
    const start = new Date().getTime();
    return next.handle().pipe(
      map(data => {
        // 요청에 응답할 때 까지 걸린 시간 측정
        const elapsed = new Date().getTime() - start;
        // 요청, 응답 로그 남기기
        this.logRequestAndResponse(request, response, data, elapsed);
        return data;
      }),
      // 에러 발생 시
      catchError(err => {
        const elapsed = new Date().getTime() - start;
        this.logRequestAndResponse(request, response, err, elapsed);
        return throwError(err);
      }),
    );
  }

  /**
   * Request 와 response 를 형식에 맞추어 로깅하는 함수
   * @param request Request to log
   * @param response Response to log
   * @param data Body data of response
   * @param elapsed 요청에 응답할 때 까지 걸린 시간
   */
  private logRequestAndResponse(request: Request, response: Response, data: any, elapsed: number) {
    const {
      url, method, headers, body,
    } = request;

    const responseHeaders = response.getHeaders();
    const { statusCode } = response;

    // Log request and response
    this.logger.log({
      request: {
        method, url, headers, body
      },
      elapsed: elapsed + 'ms', 
      response: {
        status: statusCode,
        headers: responseHeaders,
        body: data,
      }
    });
  }
}
