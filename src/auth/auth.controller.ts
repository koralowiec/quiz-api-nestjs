import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { ChangeRoleOfUserDto } from '../users/dto/change-role-of-user.dto';
import { Roles } from 'src/users/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Patch('/changeRole')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async changeRoleOfUser(
    @Body(ValidationPipe) changeRoleOfUserDto: ChangeRoleOfUserDto,
  ) {
    return this.authService.changeRoleOfUser(changeRoleOfUserDto);
  }
}
