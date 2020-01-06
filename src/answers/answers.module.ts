import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, AnswerRepository])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
