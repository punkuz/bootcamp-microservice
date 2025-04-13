import { Controller } from "@nestjs/common";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseUserDto, LoginUserDto } from "./dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern("user_signup")
  signup(
    @Payload() createUserDto: CreateUserDto,
    @Ctx() ctx: RmqContext,
  ): Promise<any> {
    return this.usersService.signup(createUserDto);
  }

  @MessagePattern("user_login")
  login(loginUserDto: LoginUserDto): Promise<any> {
    return this.usersService.login(loginUserDto);
  }

  @MessagePattern("find_All_Users")
  findAll(@Ctx() ctx: RmqContext) {
    return this.usersService.findAllUsers();
  }

  @MessagePattern("verify_token")
  async verifyToken(@Payload() token: string): Promise<BaseUserDto> {
    return this.usersService.verifyToken(token["token"]);
  }

  @MessagePattern("findOneUser")
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern("updateUser")
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern("removeUser")
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
