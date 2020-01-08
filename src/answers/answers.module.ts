import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answer.repository';
import { CheckedOptionsModule } from '../checked-options/checked-options.module';
import { OptionsModule } from '../options/options.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, AnswerRepository]),
    CheckedOptionsModule,
    OptionsModule,
    AuthModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
