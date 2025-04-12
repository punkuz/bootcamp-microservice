import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseUserDto, LoginUserDto } from "./dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern("user_signup")
  signup(@Payload() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.signup(createUserDto);
  }

  @MessagePattern("user_login")
  login(loginUserDto: LoginUserDto): Promise<any> {
    return this.usersService.login(loginUserDto);
  }

  @MessagePattern("findAllUsers")
  findAll() {
    return this.usersService.findAll();
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
