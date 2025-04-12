import { IsNotEmpty, Length } from "class-validator";

// DTO for updating password
export class UpdatePasswordDto {
  @IsNotEmpty({ message: "Please provide your current password!" })
  currentPassword: string;

  @IsNotEmpty({ message: "Please provide a new password!" })
  @Length(8, 50, { message: "Password must be between 8 and 50 characters!" })
  newPassword: string;

  @IsNotEmpty({ message: "Please confirm your new password!" })
  passwordConfirm: string;
}
