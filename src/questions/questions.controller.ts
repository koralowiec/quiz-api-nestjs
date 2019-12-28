import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Question } from './question.entity';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions(@Param('quizId', ParseIntPipe) quizId: number) {
    return this.questionsService.getQuestions(quizId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createQuestion(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() questionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.createQuestion(quizId, questionDto);
  }

  @Get('/:questionId')
  async getQuestionById(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Question> {
    return await this.questionsService.getQuestion(quizId, questionId);
  }

  @Delete('/:questionId')
  async deleteQuestion(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Question> {
    return await this.questionsService.deleteQuestion(quizId, questionId);
  }

  @Patch('/:questionId')
  @UsePipes(ValidationPipe)
  async updateQuestion(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() questionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(
      quizId,
      questionId,
      questionDto,
    );
  }
}
