import { INestApplication, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import config from "src/config";
import { AppModule } from "./AppModule";
import cors from 'cors';

// Read configurations
const { port } = config;

// Nest logger
const logger = new Logger("Bootstrap");

/**
 * Bootstrap Application module
 */
async function bootstrap (): Promise<INestApplication> {
  const application: INestApplication = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'dev')
    application.use('*', cors());
  return application;
}

bootstrap()
  .then((application) => {
    logger.log("[*] Application is generated");
    return application.listen(port);
  })
  .then(() => {
    logger.log(`[*] Http server application is listening on port ${port}`);
  })
  .catch((error) => {
    logger.error(error);
  });