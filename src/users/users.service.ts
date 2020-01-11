import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';
import { ChangeRoleOfUserDto } from './dto/change-role-of-user.dto';
import { UserRole } from './user-role.enum';

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

  async changeRoleOfUser(
    changeRoleOfUserDto: ChangeRoleOfUserDto,
  ): Promise<{ username: string; role: UserRole }> {
    const { userId, role } = changeRoleOfUserDto;
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    user.role = role;
    await user.save();

    return {
      username: user.username,
      role: user.role,
    };
  }
}
