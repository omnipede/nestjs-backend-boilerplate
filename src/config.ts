import yaml from 'js-yaml';
import fs from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';
import Joi from 'joi';

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
 * Configuration validation schema
 */
const schema = Joi.object({
  http: Joi.object({
    port: Joi.number().required()
  }).required().unknown(true),

  logger: Joi.array().items(
    Joi.string(),
  ),

  db: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
    synchronize: Joi.boolean(),
    dropSchema: Joi.boolean(),
    timezone: Joi.string().required(),
  }).required(),
});

/**
 * 설정 파일을 읽어서 메모리에 로드하는 스크립트
 */
export default () => {
  logger.log(`Environment: ${env}`);
  logger.log(`Loading configuration file: ${YAML_CONFIG_FILE}`);
  const loaded = yaml.load(
    fs.readFileSync(join(__dirname, '..', 'config', YAML_CONFIG_FILE), 'utf8'),
  );
  const { error } = schema.validate(loaded);
  if (error)
    throw new Error(JSON.stringify(error.details, null, 4));
  logger.log(JSON.stringify(loaded, null, 4));
  return loaded;
};