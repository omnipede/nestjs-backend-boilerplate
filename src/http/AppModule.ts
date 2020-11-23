import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../config";
import { LibraryModule } from "./domain/library/LibraryModule";
import { BusinessExceptionFilter } from "./global/error/BusinessExceptionFilter";
import { GlobalErrorFilter } from "./global/error/GlobalErrorFilter";
import { HttpExceptionFilter } from "./global/error/HttpExceptionFilter";
import { ErrorLoggingInterceptor } from "./global/interceptor/ErrorLoggingInterceptor";
import { ResponseBodyInterceptor } from "./global/interceptor/ResponseBodyInterceptor";
import { LoggerMiddleware } from "./global/middleware/LoggerMiddleware";

const {
  type, host, port, username, password, database, timezone, synchronize, dropSchema,
} = config.dbconfig;

@Module({
  imports: [
    LibraryModule,
    // DB 접속정보 설정
    TypeOrmModule.forRoot({
      type,
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      synchronize,
      keepConnectionAlive: true,
      timezone,
      dropSchema,
    }),
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
