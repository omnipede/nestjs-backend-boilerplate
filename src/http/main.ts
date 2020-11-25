import { INestApplication, Logger, LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";

// Nest logger
const logger = new Logger("Bootstrap");

/**
 * Bootstrap Application module
 */
async function bootstrap (): Promise<any> {
  const application: INestApplication = await NestFactory.create(AppModule);

  // 설정 값 받아오기
  const configService: ConfigService = application.get<ConfigService>(ConfigService);
  const port: number = configService.get( "http.port", 3000 ); // 포트 설정
  const logLevel: LogLevel[] = configService.get( "logger", [] ); // 로그 레벨 설정
  
  // 설정 값 세팅하기
  application.useLogger(logLevel);
  
  await application.listen(port);
  logger.log(`[*] Http server application is listening on port ${port}`);
}

bootstrap()
  .catch((error) => {
    logger.error(error);
  });