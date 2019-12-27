import { Repository, EntityRepository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  async createQuiz(createQuizDto: CreateQuizDto) {
    const { title, description } = createQuizDto;

    const quiz = new Quiz();
    quiz.title = title;
    quiz.description = description;

    await quiz.save();

    return quiz;
  }
}
