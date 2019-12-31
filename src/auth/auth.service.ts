import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const { username } = payload;
    return await this.userRepository.find({ username });
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ username: string }> {
    const username = await this.userRepository.createUser(createUserDto);

    return username;
  }

  async signIn(authUserDto: AuthUserDto) {
    const isPasswordValid = await this.userRepository.comparePassword(
      authUserDto,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { username } = authUserDto;
    const user: JwtPayload = { username };
    return this.jwtService.sign(user);
  }
}
