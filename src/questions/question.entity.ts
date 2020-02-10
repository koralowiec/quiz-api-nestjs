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
import { Photo } from '../photos/photo.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column({ type: 'text', nullable: true })
  snippet: string;

  @ManyToOne(
    type => Photo,
    photo => photo.questions,
    { nullable: true },
  )
  photo: Photo;

  @Column({ nullable: true })
  photoId: number;

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
