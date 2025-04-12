// Base DTO with common properties
export class BaseUserDto {
  id: string;
  username: string;
  email: string;
  uniqueSlug?: string;
  role: "user" | "admin" | "guide";
  password?: string;
  isActive: boolean;
  isDeleted: boolean;
  isPermanentDeleted: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
