import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * User 가 읽은 책 정보까지 가져오는 메소드
   * @param id 유저 아이디
   */
  async findUserWithBooks(id: number): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.borrowList', 'user_book')
      .leftJoinAndSelect('user_book.book', 'book')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  /**
   * 또는 아래와 같이 구현 가능 ...
   */
  async findUserWithBorrowList(id: number): Promise<User> {
    const user: User = await this.findOne(id, { relations: ['borrowList', 'borrowList.book']});
    return user;
  }
}