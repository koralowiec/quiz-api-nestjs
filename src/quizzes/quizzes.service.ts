import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: QuizRepository,
  ) {}

  async getQuizzes(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<Quiz> {
    const foundQuiz = await this.quizRepository.findOne(id);

    if (!foundQuiz) {
      throw new NotFoundException(`Quiz with id: ${id} not found`);
    }

    return foundQuiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.createQuiz(createQuizDto);
  }

  async deleteQuiz(id: number): Promise<void> {
    const deleteResult = await this.quizRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Quiz with id: ${id} not found`);
    }
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quizToUpdate = await this.getQuizById(id);

    const { title, description } = updateQuizDto;
    quizToUpdate.title = title;
    quizToUpdate.description = description;

    await quizToUpdate.save();

    return quizToUpdate;
  }
}
