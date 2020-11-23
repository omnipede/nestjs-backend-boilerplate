import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common"
import { Response } from "express";
import { ErrorCode } from "./ErrorCode";

@Catch(Error)
export class GlobalErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, exception.stack);

    const { status, code, message } = ErrorCode.InternalServerError;

    response.status(500).json({
      status, code, message,
      developer_message: exception.message,
    });
  }
}