import { EntityRepository, Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { TypeOrmErrorCodes } from '../constants/typeorm-error-codes';
import { ConflictException } from '@nestjs/common';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async createAnswerWithCorrectColumnSetToNull(
    attemptId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const { questionId } = createAnswerDto;

    let answer = new Answer();
    answer.attemptId = attemptId;
    answer.questionId = questionId;
    answer.correct = null;

    try {
      answer = await answer.save();
    } catch (error) {
      if (error.code === TypeOrmErrorCodes.DuplicateKeyVale) {
        throw new ConflictException(`Answer seems to already exist`);
      }
    }

    return answer;
  }
}
