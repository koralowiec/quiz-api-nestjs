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

  @Column({
    nullable: true,
  })
  passed: boolean;

  @ManyToOne(
    type => User,
    user => user.attempts,
  )
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.attempts,
  )
  quiz: Quiz;

  @Column()
  quizId: number;

  @OneToMany(
    type => Answer,
    answer => answer.attempt,
  )
  answers: Answer[];
}
