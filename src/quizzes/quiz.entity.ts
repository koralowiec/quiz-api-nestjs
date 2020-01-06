import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Question } from '../questions/question.entity';
import { Attempt } from '../attempts/attempt.entity';

@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  title: string;

  @Column('text')
  description: string;

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
}
