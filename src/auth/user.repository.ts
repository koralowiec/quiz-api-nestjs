import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { TypeOrmErrorCodes } from './../constants/typeorm-error-codes';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string }> {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    try {
      await user.save();
    } catch (error) {
      if (error.code === TypeOrmErrorCodes.DuplicateKeyVale) {
        throw new ConflictException(
          `User with username: ${user.username} already exsits`,
        );
      }
    }

    return { username: user.username };
  }

  async comparePassword(authUserDto: AuthUserDto): Promise<boolean> {
    const { username, password } = authUserDto;
    const user = await this.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return bcrypt.compare(password, user.password);
  }
}
