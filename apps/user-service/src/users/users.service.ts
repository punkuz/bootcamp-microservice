import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { createSendToken } from "src/auth/jwt-token";
import { JwtService } from "@nestjs/jwt";
import { BaseUserDto, LoginUserDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { userData } from "src/constants/constant";
import { HttpRpcException } from "src/exceptions/http.rpc.exception";
import { Cacheable } from "cacheable";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject("CACHE_INSTANCE") private readonly cacheService: Cacheable,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      return createSendToken(savedUser, this.jwtService);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw HttpRpcException.badRequest("Username or email already exists.");
      }
      // Handle other database errors or unexpected errors
      throw HttpRpcException.internalServerError("SignUp failed.");
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw HttpRpcException.badRequest("Please provide email and password!");
    }
    // 2) Check if user exists && password is correct
    const user = await this.userRepository.findOne({
      where: { email },
      select: userData as unknown as never,
    });
    if (!user || !(await user.correctPassword(password))) {
      throw HttpRpcException.badRequest("Incorrect email or password");
    }

    //update last login
    await this.userRepository.update(user.id, { lastLogin: new Date() });

    // // 3) If everything ok, send token to client
    return createSendToken(user, this.jwtService);
  }

  async findAllUsers() {
    const cachedUsers = await this.cacheService.get<User[]>("users");
    if (cachedUsers) {
      return cachedUsers;
    }
    const users = await this.userRepository.find();
    // Set the user in the cache with a TTL (Time-To-Live) of 1 minute (60 seconds)
    await this.cacheService.set("users", users, "1m");
    return users;
  }

  async verifyToken(token: string): Promise<BaseUserDto> {
    try {
      const decoded: { id: string; username: string } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw HttpRpcException.notFound("User not found.");
      }

      return user;
    } catch (error) {
      console.log("err from verify token", error);
      throw HttpRpcException.forbidden("Invalid or expired token.");
    }
  }

  async findOne(id: string) {
    try {
      const cachedUser = await this.cacheService.get<User>(`user:${id}`);
      if (cachedUser) {
        return cachedUser;
      }

      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw HttpRpcException.notFound("User not found.");
      }

      await this.cacheService.set(`user:${id}`, user);

      return user;
    } catch (error) {
      console.log("Error finding user:", error);
      throw HttpRpcException.notFound("User not found.");
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
