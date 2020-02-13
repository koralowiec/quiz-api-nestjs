import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Question } from '../questions/question.entity';
import { Attempt } from '../attempts/attempt.entity';
import { User } from '../users/user.entity';

@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  title: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  available: boolean;

  @OneToMany(
    type => Question,
    question => question.quiz,
  )
  questions: Question[];

  @OneToMany(
    type => Attempt,
    attempt => attempt.quiz,
  )
  attempts: Attempt[];

  @ManyToOne(
    type => User,
    user => user.quizzes,
    { nullable: true },
  )
  creator: User;

  @Column({ nullable: true })
  creatorId: number;
}
