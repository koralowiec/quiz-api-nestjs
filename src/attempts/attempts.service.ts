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
}
