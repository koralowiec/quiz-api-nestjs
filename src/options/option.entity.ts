import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Question } from '../questions/question.entity';

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
}
