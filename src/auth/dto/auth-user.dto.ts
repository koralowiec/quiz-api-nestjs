import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
