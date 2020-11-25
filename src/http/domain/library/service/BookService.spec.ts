import { Repository } from "typeorm";
import { BusinessException } from "../../../global/error/BusinessException";
import { Book } from "../entity/Book.entity";
import { BookService } from "./BookService";

/**
 * Sample service layer test code
 */
describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    bookRepository = new Repository<Book>();
    bookRepository.find = jest.fn().mockImplementation(() => {
      const book = new Book.Builder()
        .setName('홍길동')
        .build();
      return [book];
    });
    bookService = new BookService(bookRepository);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('findBooksByName', () => {
    it('should find list of books', async () => {
      // Given
      const name = '홍길동';

      // When
      const result = await bookService.findBooksByName(name);

      // Then
      expect(result).toBeInstanceOf(Array);
      expect(bookRepository.find).toBeCalledWith({ where: { name } });
      expect(bookRepository.find).toBeCalledTimes(1);
    });

    it('should throw error if books are not found', async () => {
      // Given
      const name = '홍길동';
      bookRepository.find = jest.fn().mockReturnValue([]);

      try {
        // When
        await bookService.findBooksByName(name); 
        fail();
      } catch (err) {
        // Then
        expect(err).toBeInstanceOf(BusinessException);
        const { errorCode } = err;
        expect(errorCode.status).toBe(404);
        expect(errorCode.code).toBe(40401);
      }
    });
  });
});
