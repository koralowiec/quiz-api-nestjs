import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Option } from '../options/option.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @OneToMany(
    type => Option,
    option => option.question,
    { eager: true },
  )
  options: Option[];

  @ManyToOne(
    type => Quiz,
    quiz => quiz.questions,
  )
  quiz: Quiz;

  @Column()
  quizId: number;

  @OneToMany(
    type => Answer,
    answer => answer.question,
  )
  answers: Answer[];
}
