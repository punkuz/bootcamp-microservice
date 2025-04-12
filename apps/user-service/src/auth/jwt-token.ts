import { JwtService } from "@nestjs/jwt";
import { BaseUserDto } from "src/users/dto";

//Return token response
export const createSendToken = async (
  user: BaseUserDto,
  jwtService: JwtService,
) => {
  const payload = { id: user.id, username: user.username };
  const token = await jwtService.signAsync(payload);

  // Remove password from output
  user.password = undefined;

  return {
    token,
    user,
  };
};
