import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "typeorm";
import { AppModule } from "../../../AppModule";
import { User } from "./User.entity";

describe('User entity', () => {
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    connection = module.get<Connection>(Connection);
  });

  afterEach(async () => {
    await connection.manager.delete(User, {});
    await connection.close();
  });

  it('Phone number should be unique', async () => {
    // Given
    const phoneNumber = '01012345678';
    const user: User = new User.Builder()
      .setPhoneNumber(phoneNumber)
      .setName('홍길동')
      .build();

    await connection.manager.save(user);
    
    try {
      // When
      const user: User = new User.Builder()
        .setPhoneNumber(phoneNumber)
        .setName('김철수')
        .build();
      await connection.manager.save(user);
      fail();
    } catch (error) {
      // Then
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Phone number should not be null', async () => {
    // Given
    const user: User = new User();
    user.name = '홍길동';
    try {
      // When
      await connection.manager.save(user);
      fail();
    } catch(error) {
      // Then
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Name should not be null', async () => {
    // Given
    const user: User = new User();
    user.phoneNumber = '01012345678';

    try {
      // When
      await connection.manager.save(user);
      fail();
    } catch(error) {
      // Then
      expect(error).toBeInstanceOf(Error);
    }
  });
});