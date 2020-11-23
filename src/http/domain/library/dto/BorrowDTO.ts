import Joi from "joi";

export class BorrowDTO {
  book_id: number;
  user_id: number;

  static readonly schema = Joi.object({
    book_id: Joi.number().min(1).max(1024).required(),
    user_id: Joi.number().min(1).max(1024).required(),
  });
}