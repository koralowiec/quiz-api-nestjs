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

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // title: string;

  @Column('text')
  description: string;

  @OneToMany(
    type => Option,
    option => option.question,
  )
  options: Option[];

  @ManyToOne(
    type => Quiz,
    quiz => quiz.questions,
  )
  quiz: Quiz;

  @Column()
  quizId: number;
}
