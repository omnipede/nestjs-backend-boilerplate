import yaml from 'js-yaml';
import fs from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config({
  path: join(__dirname, '..', 'config', '.env')
});

/**
 * 기본 설정 파일 이름이 application 일 때,
 * dev 환경에서는 application.dev.yaml 을,
 * prod 환경에서는 application.prod.yaml 을 읽어온다.
 */
const env = process.env.NODE_ENV;
let YAML_CONFIG_FILE = process.env.CONFIG_FILE || 'application';

if (typeof env === 'string')
  YAML_CONFIG_FILE += '.' + env + '.yaml';

const logger = new Logger('Configuration');

/**
 * 설정 파일을 읽어서 메모리에 로드하는 스크립트
 */
export default () => {
  logger.log(`Environment: ${env}`);
  logger.log(`Loading configuration file: ${YAML_CONFIG_FILE}`);
  const loaded = yaml.load(
    fs.readFileSync(join(__dirname, '..', 'config', YAML_CONFIG_FILE), 'utf8'),
  );
  logger.log(JSON.stringify(loaded, null, 4));
  return loaded;
};