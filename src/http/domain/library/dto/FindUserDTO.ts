import Joi from "joi";

export class FindUserDTO {
  static readonly schema = Joi.number().min(1).max(1024);
}