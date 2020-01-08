import { EntityRepository, Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { TypeOrmErrorCodes } from '../constants/typeorm-error-codes';
import { ConflictException, BadRequestException } from '@nestjs/common';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async createAnswerWithCorrectColumnSetToNull(
    attemptId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const { questionId } = createAnswerDto;

    if (
      await this.isQuestionAlreadyAnsweredItThisAttempt(questionId, attemptId)
    ) {
      throw new ConflictException(
        `User already answered question with id: ${questionId} in this attempt (attempt id: ${attemptId})`,
      );
    }

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
      switch (error.code) {
        case TypeOrmErrorCodes.DuplicateKeyVale:
          throw new ConflictException(`Answer seems to already exist`);
          break;
        case TypeOrmErrorCodes.InsertOrUpdateViolatesForeignKeyContraint:
          throw new BadRequestException(
            `Not valid questionId: ${questionId} or attemptId: ${attemptId}`,
          );
          break;
        default:
          break;
      }
    }

    return answer;
  }

  private async isQuestionAlreadyAnsweredItThisAttempt(
    questionId: number,
    attemptId: number,
  ): Promise<boolean> {
    const answer = await this.findOne({ where: { questionId, attemptId } });
    return answer ? true : false;
  }
}
