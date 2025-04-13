import { CreateUserDto } from "src/user/dto";

export interface AuthRequest extends Request {
  user?: CreateUserDto;
}
