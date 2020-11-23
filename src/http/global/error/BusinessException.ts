import { ErrorCode } from "./ErrorCode";

export class BusinessException extends Error {
  
  // Exception handler 에게 전달하는 에러 코드
  public readonly errorCode: ErrorCode;
  // 추가적인 에러 정보 (optional)
  public developer_message: any;

  /**
   * 비지지스 로직 상에서 발생하는 에러를 추상화한 객체
   * @param errorCode Exception handler 에게 전달하는 에러 코드
   * @param developer_message 추가적인 에러 정보
   */
  constructor(errorCode: ErrorCode, developer_message?: any) {
    super()
    this.errorCode = errorCode;
    this.developer_message = developer_message;
  }
}