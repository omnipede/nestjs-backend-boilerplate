import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { ObjectSchema, Schema } from "joi";
import { BusinessException } from "../error/BusinessException";
import { ErrorCode } from "../error/ErrorCode";

/**
 * Joi validation schema 에 따라 API parameter 를 검증할 때 사용하는 pipe
 */
export class JoiValidationPipe implements PipeTransform {

  constructor(private schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {

    const { error } = this.schema.validate(value);
    // Validation error 발생 시 bad request exception 발생
    if (error) {
      throw new BusinessException(ErrorCode.InvalidBody, error.details);
    }

    return value;
  }
}