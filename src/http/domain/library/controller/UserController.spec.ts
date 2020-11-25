import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../entity/User.entity";
import { UserService } from "../service/UserService";
import { UserController } from "./UserController";

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockImplementation(),
          }
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findUserById', () => {
    it('should not throw error', async () => {
      // Given
      const user = new User.Builder()
        .setName('홍길동')
        .setPhoneNumber('01021884701')
        .build();
      user.id = 1;
      userService.findUserById = jest.fn().mockReturnValue(user);

      // When
      const result = await userController.findUserById(user.id);

      // Then
      expect(userService.findUserById).toBeCalledTimes(1);
      expect(userService.findUserById).toBeCalledWith(user.id);
      expect(result.id).toBe(user.id);
      expect(result.name).toBe(user.name);
      expect(result.phone_number).toBe(user.phoneNumber);
    });
  });
});