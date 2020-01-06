import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Answer } from '../answers/answer.entity';
import { type } from 'os';
import { Option } from '../options/option.entity';

@Entity()
export class CheckedOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correct: boolean;

  @ManyToOne(
    type => Answer,
    answer => answer.checkedOptions,
  )
  answer: Answer;

  @Column()
  answerId: number;

  @ManyToOne(
    type => Option,
    option => option.checkedOptions,
  )
  option: Option;

  @Column()
  optionId: number;
}
