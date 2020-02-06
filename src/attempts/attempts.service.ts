import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { Attempt } from './attempt.entity';
import { AttemptRepository } from './attempt.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(AttemptRepository)
    private readonly attemptRepository: AttemptRepository,
  ) {}

  async createAttempt(
    createAttemptDto: CreateAttemptDto,
    userId: number,
  ): Promise<Attempt> {
    return this.attemptRepository.createAttempt(createAttemptDto, userId);
  }

  async getAttempt(attemptId: number): Promise<Attempt> {
    const attempt = await this.attemptRepository.findOne(attemptId);

    if (!attempt) {
      throw new NotFoundException(`Attempt with id: ${attemptId} not found`);
    }

    return attempt;
  }

  async getAttempts(userId): Promise<Attempt[]> {
    const attempts = await this.attemptRepository.find({ where: { userId } });
    return attempts;
  }

  async endAttemptBySettingPassResult(attemptId: number) {
    const attemptWithAnswers = await this.attemptRepository.getAttemptWithAnswers(
      attemptId,
    );

    if (!attemptWithAnswers) {
      throw new NotFoundException(
        `Attempt with id: ${attemptId} doesn't exist`,
      );
    }

    const passScore = 0.6;

    return this.calculateIfAttemptShouldBePassedAndUpdatePassResult(
      attemptWithAnswers,
      passScore,
    );
  }

  private calculateIfAttemptShouldBePassedAndUpdatePassResult(
    attemptWithAnswers: Attempt,
    passScore: number,
  ): Promise<Attempt> {
    const { answers } = attemptWithAnswers;
    const numberOfCorrectAnswers = answers.filter(answer => answer.correct)
      .length;

    if (
      Math.round((numberOfCorrectAnswers / answers.length) * 100) / 100 >=
      passScore
    ) {
      attemptWithAnswers.passed = true;
    } else {
      attemptWithAnswers.passed = false;
    }

    return attemptWithAnswers.save();
  }
}
