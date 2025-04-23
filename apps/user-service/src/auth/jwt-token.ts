import { JwtService } from "@nestjs/jwt";
import { HttpRpcException } from "src/exceptions/http.rpc.exception";
import { BaseUserDto } from "src/users/dto";

//Return token response
export const createSendToken = async (
  user: BaseUserDto,
  jwtService: JwtService,
) => {
  const payload = { id: user.id, username: user.username };
  try {
    const token = await jwtService.signAsync(payload);

    // Remove password from output
    user.password = undefined;

    return {
      token,
      user,
    };
  } catch (error) {
    console.log("error", error);
    throw HttpRpcException.internalServerError(
      "Could not generate authentication token.",
    );
  }
};
