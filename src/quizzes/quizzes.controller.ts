import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller()
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async getQuizzes(): Promise<Quiz[]> {
    return await this.quizzesService.getQuizzes();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.createQuiz(createQuizDto);
  }

  @Get('/:quizId')
  async getQuizById(@Param('quizId', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizzesService.getQuizById(id);
  }

  @Delete('/:quizId')
  async deleteQuiz(@Param('quizId', ParseIntPipe) id: number): Promise<void> {
    return await this.quizzesService.deleteQuiz(id);
  }

  @Put('/:quizId')
  async updateQuiz(
    @Param('quizId', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return await this.quizzesService.updateQuiz(id, updateQuizDto);
  }
}
