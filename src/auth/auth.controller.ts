import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from '../users/dto/auth-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signIn')
  async signIn(@Body(ValidationPipe) authUserDto: AuthUserDto) {
    return this.authService.signIn(authUserDto);
  }
}
