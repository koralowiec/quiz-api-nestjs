import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Attempt } from 'src/attempts/attempt.entity';
import { UserRole } from './user-role.enum';
import { Quiz } from '../quizzes/quiz.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(
    type => Attempt,
    attempt => attempt.user,
  )
  attempts: Attempt[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @OneToMany(
    type => Quiz,
    quiz => quiz.creator,
  )
  quizzes: Quiz[];
}
