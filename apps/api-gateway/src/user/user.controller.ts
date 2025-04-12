import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { LoginUserDto } from "./dto/login-user.dto";
// import { AuthRequest } from "./types/request.type";
// import { catchError, throwError } from "rxjs";

@Controller("users")
export class UserController {
  constructor(
    @Inject("USER_CLIENT") private readonly userClient: ClientProxy,
  ) {}

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
