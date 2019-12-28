import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionRepository])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
