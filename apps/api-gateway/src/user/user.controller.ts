import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { ClientProxy } from "@nestjs/microservices";
import { LoginUserDto } from "./dto/login-user.dto";
import { Roles } from "src/decorators/roles.decoraator";
import { Role } from "src/types/role.enum";
import { RolesGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
// import { AuthRequest } from "./types/request.type";
// import { catchError, throwError } from "rxjs";

@Controller("users")
export class UserController {
  constructor(
    @Inject("USER_CLIENT") private readonly userClient: ClientProxy,
  ) {}

  @Get("listusers")
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  findAllUsers() {
    return this.userClient.send("find_All_Users", {});
  }

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send("user_signup", createUserDto);
  }
  //add a comment
  // @Patch("updatePassword")
  // updatedPassword(
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  //   @Request() req: AuthRequest,
  // ) {
  //   return this.userClient.send("update_password", {
  //     updatePasswordDto,
  //     token: req.headers.authorization,
  //   });
  // }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userClient.send("user_login", loginUserDto);
  }

  @Get(":id")
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  findUserById(@Param("id") id: string) {
    return this.userClient.send("find_user_by_id", id);
  }
}
