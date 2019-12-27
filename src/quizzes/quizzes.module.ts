import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizRepository } from './quiz.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizRepository])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
