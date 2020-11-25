import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "typeorm";
import { AppModule } from "../../../AppModule";
import { Book } from "./Book.entity";

describe('Book entity', () => {
  let connection: Connection;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(Connection);
  });

  afterEach(async () => {
    await connection.manager.delete(Book, {});
    await connection.close();
  });

  it('Book name should not be null', async () => {
    // Given
    const book = new Book();
    try {
      // When
      await connection.manager.save(book);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});