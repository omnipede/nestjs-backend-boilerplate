import Joi from "joi";

export class FindBooksDTO {
  static readonly schema = Joi.string().max(128).required();
}