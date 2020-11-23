import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessException } from "../../../global/error/BusinessException";
import { ErrorCode } from "../../../global/error/ErrorCode";
import { Book } from "../entity/Book.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  /**
   * 책 이름으로 조회하는 메소드
   * @param name 책 이름
   * @returns 이름으로 검색한 책 리스트
   */
  public async findBooksByName(name: string): Promise<Book[]> {
    const bookList = await this.bookRepository.find({ where: { name }});
    if (bookList.length === 0)
      throw new BusinessException(ErrorCode.NotFoundData, `${name}으로 등록된 책이 없습니다`);
    return bookList;
  }

  /**
   * 책 아이디로 조회하는 메소드
   * @param id 책 아이디
   * @returns 책 정보
   */
  public async findBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book)
      throw new BusinessException(ErrorCode.NotFoundData, `id: ${id} 로 등록된 책이 없습니다.`);
    return book;
  }
}