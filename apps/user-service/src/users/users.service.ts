import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { createSendToken } from "src/auth/jwt-token";
import { RpcException } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { getUserRepo } from "src/repositiories/repository";
import { BaseUserDto, LoginUserDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { userData } from "src/constants/constant";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await getUserRepo().save(user);
      return createSendToken(savedUser, this.jwtService);
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new RpcException("Please provide email and password!");
    }
    // 2) Check if user exists && password is correct
    const user = await this.userRepository.findOne({
      where: { email },
      select: userData as any,
    });
    if (!user || !(await user.correctPassword(password))) {
      throw new RpcException("Incorrect email or password");
    }

    //update last login
    await this.userRepository.update(user.id, { lastLogin: new Date() });

    // // 3) If everything ok, send token to client
    return createSendToken(user, this.jwtService);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
