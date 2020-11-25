import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entity/Book.entity";
import { Borrow } from "../entity/Borrow.entity";
import { User } from "../entity/User.entity";

export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {}

  public async borrow(user: User, book: Book): Promise<Borrow> {
    const borrowEntity = new Borrow.Builder()
      .setUser(user)
      .setBook(book)
      .build();
    return this.borrowRepository.save(borrowEntity);
  }
}