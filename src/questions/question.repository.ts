import { Repository, EntityRepository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async createQuestion(
    quizId: number,
    questionDto: CreateQuestionDto,
  ): Promise<Question> {
    const { description } = questionDto;

    const question = new Question();
    question.quizId = quizId;
    question.description = description;

    return await question.save();
  }
}
