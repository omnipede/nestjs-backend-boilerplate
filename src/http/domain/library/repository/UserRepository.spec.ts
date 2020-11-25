import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from "typeorm";
import { AppModule } from '../../../AppModule';
import { Book } from '../entity/Book.entity';
import { Borrow } from '../entity/Borrow.entity';
import { User } from '../entity/User.entity';
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    connection = module.get<Connection>(Connection);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findUserWithBooks', () => {

    afterEach(async () => {
      await connection.manager.delete(User, {});
    });

    it('should not throw error', async () => {
      // Given
      const user: User = new User.Builder()
        .setPhoneNumber('01012345678')
        .setName('홍길동')
        .build();

      const book: Book = new Book.Builder()
        .setName('1권')
        .build();

      await connection.manager.save(user);
      await connection.manager.save(book);

      const borrow: Borrow = new Borrow.Builder()
        .setBook(book)
        .setUser(user)
        .build();
      await connection.manager.save(borrow);

      // When
      const result = await userRepository.findUserWithBooks(user.id);
      
      // Then
      expect(result).toBeDefined();
      expect(result.borrowList).toBeDefined();
      expect(result.borrowList[0].book.id).toBe(book.id);
    });
  });

  describe('findUserWithBorrowList', () => {

    afterEach(async () => {
      await connection.manager.delete(User, {});
    });

    it('should not throw error', async () => {
      // Given
      const user: User = new User.Builder()
        .setPhoneNumber('01012345678')
        .setName('홍길동')
        .build();

      const book: Book = new Book.Builder()
        .setName('1권')
        .build();

      await connection.manager.save(user);
      await connection.manager.save(book);

      const borrow: Borrow = new Borrow.Builder()
        .setBook(book)
        .setUser(user)
        .build();
      await connection.manager.save(borrow);

      // When
      const result = await userRepository.findUserWithBorrowList(user.id);
      
      // Then
      expect(result).toBeDefined();
      expect(result.borrowList).toBeDefined();
      expect(result.borrowList[0].book.id).toBe(book.id);
    });
  });
});