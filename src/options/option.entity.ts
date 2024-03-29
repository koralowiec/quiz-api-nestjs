import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '../questions/question.entity';
import { CheckedOption } from '../checked-options/checked-option.entity';

@Entity()
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(
    type => Question,
    question => question.options,
    {
      onDelete: 'CASCADE',
    },
  )
  question: Question;

  @Column()
  questionId: number;

  @OneToMany(
    type => CheckedOption,
    checkedOption => checkedOption.option,
  )
  checkedOptions: CheckedOption[];
}
