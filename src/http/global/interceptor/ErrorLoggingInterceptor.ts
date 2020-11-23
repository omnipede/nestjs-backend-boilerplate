import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

/**
 * 에러 발생 위치 및 에러 상세 정보를 로깅하는 인터셉터
 */
export class ErrorLoggingInterceptor implements NestInterceptor {

  private readonly logger = new Logger(ErrorLoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        // 테스트 중에는 에러 로깅하지 않음
        if (process.env.NODE_ENV === 'test') {
          return throwError(err);
        }

        this.logger.error(err.stack);
        this.logger.error({
          name: err.name,
          message: err.message,
          err,
        });
        return throwError(err);
      }),
    );
  }
}