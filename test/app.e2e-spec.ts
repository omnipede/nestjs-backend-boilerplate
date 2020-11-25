import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "typeorm";
import request from 'supertest';
import { AppModule } from "../src/http/AppModule";
import { Book } from "../src/http/domain/library/entity/Book.entity";
import { Borrow } from "../src/http/domain/library/entity/Borrow.entity";
import { User } from "../src/http/domain/library/entity/User.entity";

describe('Integration test', () => {
  let connection: Connection;
  let application: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    connection = module.get<Connection>(Connection);
    application = module.createNestApplication();

    // (!) 주의: 반드시 다음 코드를 넣어야 함
    await application.init();
  });

  afterEach(async () => {
    await connection.close();
    await application.close();
  });

  /**
   * Sample test code
   */
  describe('GET /api/v1/user', () => {
    const endpoint = '/api/v1/user';
    it('should not throw error', async () => {
      // Given
      const user: User = new User.Builder()
        .setName('홍길동')
        .setPhoneNumber('01012345678')
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
      const result = await request(application.getHttpServer())
        .get(`${endpoint}?id=${user.id}`);

      // Then
      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
      const { id, name, phone_number, borrow_list } = result.body.data;
      expect(id).toBe(user.id);
      expect(name).toBe(user.name);
      expect(phone_number).toBe(user.phoneNumber);
      expect(borrow_list.length).toBe(1);
      const b = borrow_list[0];
      expect(b.id).toBe(book.id);
      expect(b.name).toBe(book.name);

      console.log(JSON.stringify(result.body, null, 4));
    });

    // Input validation test
    const invalidInputs = [
      '0', // Too small
      '1025' // Too large
    ];

    invalidInputs.forEach(async (invalidInput) => {
      it(`should throw 400 error with invalid input ${JSON.stringify(invalidInput)}`, async () => {
        // When
        const result = await request(application.getHttpServer())
          .get(`${endpoint}?id=${invalidInput}`);
        // Then
        expect(result.status).toBe(400);
        expect(result.body).toBeDefined();
        const { status, code } = result.body;
        expect(status).toBe(400);
        expect(code).toBe(40000);
      });
    })
  });
});