import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "../../../global/pipe/JoiValidationPipe";
import { FindUserDTO } from "../dto/FindUserDTO";
import { UserService } from "../service/UserService";

@Controller("/api/v1/user")
export class UserController {

  constructor(
    private userService: UserService,
  ) {}

  /**
   * 사용자 정보를 반환하는 API
   * @param 사용자 아이디
   * @returns 사용자 이름, 아이디, 전화번호
   */
  @Get()
  @UsePipes(new JoiValidationPipe(FindUserDTO.schema))
  public async findUserById(@Query('id') userId: number)
    : Promise<{ id: number, name: string, phone_number: string }> {
    const user = await this.userService.findUserById(userId);

    // id, name, phoneNumber 추출
    const responseBodyDTO = {
      id: user.id,
      name: user.name,
      phone_number: user.phoneNumber,
      borrow_list: user.borrowList,
    };

    return responseBodyDTO;
  }
}