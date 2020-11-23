import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "../../../global/pipe/JoiValidationPipe";
import { BorrowDTO } from "../dto/BorrowDTO";
import { Book } from "../entity/Book.entity";
import { User } from "../entity/User.entity";
import { BookService } from "../service/BookService";
import { BorrowService } from "../service/BorrowService";
import { UserService } from "../service/UserService";

@Controller("/api/v1/borrow")
export class BorrowController {

  constructor(
    private borrowService: BorrowService,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  /**
   * 사용자가 책을 빌리는 메소드
   */
  @Post()
  @UsePipes(new JoiValidationPipe(BorrowDTO.schema))
  public async borrow(@Body() dto: BorrowDTO) {
    const { book_id: bookId, user_id: userId } = dto;

    const user: User = await this.userService.findUserById(userId);
    const book: Book = await this.bookService.findBookById(bookId);

    await this.borrowService.borrow(user, book);
  }
}