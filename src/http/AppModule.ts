import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LibraryModule } from "./domain/library/LibraryModule";
import { BusinessExceptionFilter } from "./global/error/BusinessExceptionFilter";
import { GlobalErrorFilter } from "./global/error/GlobalErrorFilter";
import { HttpExceptionFilter } from "./global/error/HttpExceptionFilter";
import { ErrorLoggingInterceptor } from "./global/interceptor/ErrorLoggingInterceptor";
import { ResponseBodyInterceptor } from "./global/interceptor/ResponseBodyInterceptor";
import { LoggerMiddleware } from "./global/middleware/LoggerMiddleware";
import config from "../config";

@Module({
  imports: [
    LibraryModule,
    // 설정 로드
    ConfigModule.forRoot({
      load: [config],
    }),
    // DB 접속정보 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host', 'localhost'),
        port: configService.get('db.port', 3306),
        username: configService.get('db.username', 'root'),
        password: configService.get('db.password', 'password'),
        database: configService.get('db.database', 'database_development'),
        synchronize: configService.get('db.synchronize', false),
        timezone: configService.get('db.timezone', 'Z'),
        dropSchema: configService.get('db.dropSchema', false),
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
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
