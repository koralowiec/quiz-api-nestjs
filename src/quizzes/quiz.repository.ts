import { Repository, EntityRepository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { User } from '../users/user.entity';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  async createQuiz(createQuizDto: CreateQuizDto, creator: User) {
    const { title, description } = createQuizDto;

    const quiz = new Quiz();
    quiz.title = title;
    quiz.description = description;
    quiz.creator = creator;

    await quiz.save();

    return quiz;
  }

  getQuizByOwnerAndOnlyAvailable(creator: User, queries): Promise<Quiz[]> {
    const { ownerablility, onlyAvailable } = queries;

    const query = this.createQueryBuilder('quiz');

    if (ownerablility) {
      query.andWhere('quiz.creatorId = :creatorId', { creatorId: creator.id });
    }

    if (onlyAvailable) {
      query.andWhere('quiz.available = true');
    }

    return query.getMany();
  }
}
