import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { BusinessException } from "./BusinessException";

/**
 * Business exception 을 처리하는 filter
 */
@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(BusinessExceptionFilter.name);

  // Exception handling method
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Exception 내부의 에러 코드를 추출
    const errorCode = exception.errorCode;
    const developer_message = exception.developer_message;

    const { status, code, message } = errorCode;
    
    // 에러 코드에 따라 http 응답 반환
    response.status(status).json({
      status, code, message, developer_message,
    });
  }
}
