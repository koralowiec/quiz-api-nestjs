import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: QuizRepository,
  ) {}

  async getQuizzes(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.createQuiz(createQuizDto);
  }
}
