import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { LibraryModule } from "./domain/library/LibraryModule";
import { BusinessExceptionFilter } from "./global/error/BusinessExceptionFilter";
import { GlobalErrorFilter } from "./global/error/GlobalErrorFilter";
import { HttpExceptionFilter } from "./global/error/HttpExceptionFilter";
import { ErrorLoggingInterceptor } from "./global/interceptor/ErrorLoggingInterceptor";
import { ResponseBodyInterceptor } from "./global/interceptor/ResponseBodyInterceptor";
import { LoggerMiddleware } from "./global/middleware/LoggerMiddleware";
import config from "../config";
import { DatabaseModule } from "../db/DatabaseModule";

@Module({
  imports: [
    LibraryModule,
    // 설정 로드
    ConfigModule.forRoot({
      load: [config],
    }),
    // DB 커넥션
    DatabaseModule,
  ],
  // Filter, interceptor 적용
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BusinessExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseBodyInterceptor,
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware 적용
    consumer
      .apply(LoggerMiddleware).forRoutes('*');
  }
}
