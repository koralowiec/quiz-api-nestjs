import { Controller, Get, Post, Body } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async getQuizzes(): Promise<Quiz[]> {
    return await this.quizzesService.getQuizzes();
  }

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.createQuiz(createQuizDto);
  }
}
