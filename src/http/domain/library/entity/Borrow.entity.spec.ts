import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "typeorm";
import { AppModule } from "../../../AppModule";
import { Book } from "./Book.entity";
import { Borrow } from "./Borrow.entity";
import { User } from "./User.entity";

describe('Borrow entity', () => {
  let connection: Connection;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(Connection);
  });

  afterEach(async () => {
    await connection.manager.delete(Book, {});
    await connection.manager.delete(User, {});
    await connection.manager.delete(Borrow, {});
    await connection.close();
  });

  it('User should not be null', async () => {
    // Given
    const book: Book = new Book.Builder()
      .setName('홍길동')
      .build();
    await connection.manager.save(book);
    const borrow = new Borrow();
    borrow.book = book; // user is null
    
    try {
      // When
      await connection.manager.save(borrow);
      fail();
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Book should not be null', async () => {
    // Given
    const user: User = new User.Builder()
      .setName('홍길동')
      .setPhoneNumber('01012345678')
      .build();
    await connection.manager.save(user);
    const borrow = new Borrow();
    borrow.user = user; // book is null

    try {
      // When
      await connection.manager.save(borrow);
      fail();
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(Error);
    }
  })
});
