import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class ChangeRoleOfUserDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
