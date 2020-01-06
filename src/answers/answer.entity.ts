import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Attempt } from '../attempts/attempt.entity';
import { Question } from 'src/questions/question.entity';
import { CheckedOption } from '../checked-options/checked-option.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correct: boolean;

  @ManyToOne(
    type => Attempt,
    attempt => attempt.answers,
  )
  attempt: Attempt;

  @Column()
  attemptId: number;

  @ManyToOne(
    type => Question,
    question => question.answers,
  )
  question: Question;

  @Column()
  questionId: number;

  @OneToMany(
    type => CheckedOption,
    checkedOption => checkedOption.answer,
  )
  checkedOptions: CheckedOption[];
}
