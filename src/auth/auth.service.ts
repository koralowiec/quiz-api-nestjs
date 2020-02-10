import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ChangeRoleOfUserDto } from '../users/dto/change-role-of-user.dto';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const { username } = payload;
    return await this.usersService.findByUsername(username);
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ username: string }> {
    const username = await this.usersService.createUser(createUserDto);

    return username;
  }

  async signIn(authUserDto: AuthUserDto) {
    const isPasswordValid = await this.usersService.comparePassword(
      authUserDto,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { username } = authUserDto;
    const user: JwtPayload = { username };
    const token = await this.jwtService.sign(user);

    const role: UserRole = await this.usersService.getUserRole(authUserDto);

    return {
      token,
      role,
    };
  }

  changeRoleOfUser(changeRoleDto: ChangeRoleOfUserDto) {
    return this.usersService.changeRoleOfUser(changeRoleDto);
  }
}
