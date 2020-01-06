import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Attempt extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  passed: boolean;

  @ManyToOne(
    type => User,
    user => user.attempts,
  )
  user: User;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.attempts,
  )
  quiz: Quiz;

  @OneToMany(
    type => Answer,
    answer => answer.attempt,
  )
  answers: Answer[];
}
