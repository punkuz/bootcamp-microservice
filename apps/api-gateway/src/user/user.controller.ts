import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
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
    try {
      return this.userClient.send("find_All_Users", {});
    } catch (error) {
      if (error instanceof RpcException) {
        // If the microservice returned an RpcException, re-throw it
        throw error;
      }
      throw new HttpException(
        "User Fetch failed. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post("signup")
  signup(@Body() user: CreateUserDto) {
    try {
      return this.userClient.send("user_signup", user);
    } catch (error) {
      if (error instanceof RpcException) {
        // If the microservice returned an HttpException, re-throw it
        throw error;
      }
      throw new HttpException(
        "Signup failed. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    try {
      return this.userClient.send("user_login", loginUserDto);
    } catch (error) {
      if (error instanceof RpcException) {
        // If the microservice returned an RpcException, re-throw it
        throw error;
      }
      throw new HttpException(
        "Login failed. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
