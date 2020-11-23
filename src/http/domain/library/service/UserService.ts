import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "../../../global/error/BusinessException";
import { ErrorCode } from "../../../global/error/ErrorCode";
import { User } from "../entity/User.entity";
import { UserRepository } from "../repository/UserRepository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  /**
   * 아이디로 사용자 정보를 조회하는 메소드
   * @param id 사용자 아이디
   */
  public async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUserWithBooks(id);
    if (!user)
      throw new BusinessException(ErrorCode.NotFoundData, `존재하지 않는 사용자 아이디입니다: ${id}`);
    return user;
  }
}