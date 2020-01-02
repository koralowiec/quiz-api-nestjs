import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string }> {
    return this.userRepository.createUser(createUserDto);
  }

  async comparePassword(authUserDto: AuthUserDto): Promise<boolean> {
    return this.userRepository.comparePassword(authUserDto);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }
}
