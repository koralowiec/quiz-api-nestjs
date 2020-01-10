import { EntityRepository, Repository } from 'typeorm';
import { Attempt } from './attempt.entity';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@EntityRepository(Attempt)
export class AttemptRepository extends Repository<Attempt> {
  async createAttempt(
    createAttemptDto: CreateAttemptDto,
    userId: number,
  ): Promise<Attempt> {
    const { quizId } = createAttemptDto;

    const attempt = new Attempt();
    attempt.quizId = quizId;
    attempt.userId = userId;
    attempt.passed = null;

    return attempt.save();
  }

  async getAttemptWithAnswers(attemptId: number): Promise<Attempt> {
    const query = this.createQueryBuilder('attempt');

    query
      .leftJoinAndSelect('attempt.answers', 'answer')
      .where('attempt.id = :id', { id: attemptId });

    return await query.getOne();
  }
}
