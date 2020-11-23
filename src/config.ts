import { Logger } from "@nestjs/common";

class Configuration {
  public port: number;
  public dbconfig: {
    type: 'mysql' | 'mariadb',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    timezone: '+0' | 'Z',
    synchronize: boolean,
    dropSchema: boolean,
  }

  constructor() {
    this.port = 3000;
    this.dbconfig = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'database_development',
      timezone: 'Z', /* 주의, 서버 배포시 timezone 확인하여 수정하기 */
      synchronize: false, /* 주의, 개발 외에는 false 로 두기 */
      dropSchema: false, /* 주의, 테스트 외에는 false 로 두기 */
    }
  }
}

/**
 * Development configuration
 */
const development = new Configuration();
development.port = 3001;
development.dbconfig.synchronize = true;

/**
 * Production configuration
 */
const production = new Configuration();
production.port = 3001;

/**
 * Test configuration
 */
const test = new Configuration();
test.dbconfig.database = 'test_schema'; /* 주의, 반드시 운영 환경과 다른 schema 이름 사용하기. 그렇지 않으면 운영 테이블이 전부 날아갈 수 있음 */
test.dbconfig.synchronize = true;
test.dbconfig.dropSchema = true; /* 주의, 테스트환경에서만 사용하기 */

// NODE_ENV 에 따라 설정을 다르게 함
let config: Configuration = development;
if (process.env.NODE_ENV === 'prod')
  config = production;
if (process.env.NODE_ENV === 'test')
  config = test;

// 운영 환경인지 개발 환경인지 로깅
const logger = new Logger("Configuration");
logger.log(`Node environment: ${process.env.NODE_ENV}`);

// 개발 버전에서만 설정 출력
if (process.env.NODE_ENV === 'dev') {
  logger.log(`\n${JSON.stringify(config, null, 4)}`);
}

export default config;
