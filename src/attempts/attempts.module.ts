import { Module } from '@nestjs/common';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './attempt.entity';
import { AttemptRepository } from './attempt.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, AttemptRepository])],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
