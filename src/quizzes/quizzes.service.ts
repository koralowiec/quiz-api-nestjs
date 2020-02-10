import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from '../users/user.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: QuizRepository,
  ) {}

  async getQuizzes(ownerablility: boolean, creator: User): Promise<Quiz[]> {
    if (!ownerablility) {
      return this.quizRepository.find();
    }

    return this.quizRepository.find({ where: { creator } });
  }

  async getQuizById(id: number): Promise<Quiz> {
    const foundQuiz = await this.quizRepository.findOne(id);

    if (!foundQuiz) {
      throw new NotFoundException(`Quiz with id: ${id} not found`);
    }

    return foundQuiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto, creator: User): Promise<Quiz> {
    return await this.quizRepository.createQuiz(createQuizDto, creator);
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
