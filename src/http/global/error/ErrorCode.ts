export class ErrorCode {
  static readonly InvalidBody = new ErrorCode(400, 40000, 'Bad request');
  static readonly Unauthorized = new ErrorCode(401, 40100, 'Unauthorized');
  static readonly Timeout = new ErrorCode(401, 40101, "Timeout");
  static readonly NotFoundUri = new ErrorCode(404, 40400, 'Not found uri or maybe wrong http method');
  static readonly NotFoundData = new ErrorCode(404, 40401, 'Not found data');
  static readonly DuplicateEntry = new ErrorCode(409, 40900, 'Duplicate entry');
  static readonly InternalServerError = new ErrorCode(500, 50000, 'Internal server error');
  private constructor(public readonly status: number, public readonly code: number, public readonly message: string) {}
}

