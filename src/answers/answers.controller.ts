import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerWithCheckedOptionsDto } from './dto/create-answer-with-checked-options.dto';
import { Answer } from './answer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard())
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  async getAnswer() {
    console.warn('not implemented');
  }

  @Post()
  async createAnswer(
    @Param('attemptId', ParseIntPipe) attemptId: number,
    @Body(ValidationPipe)
    createAnswerWithCheckedOptionsDto: CreateAnswerWithCheckedOptionsDto,
  ): Promise<Answer> {
    return this.answersService.saveAnswerWithCheckedOptions(
      attemptId,
      createAnswerWithCheckedOptionsDto,
    );
  }

  @Get('/:answerId')
  async getAnswerById() {
    console.warn('not implemented');
  }
}
