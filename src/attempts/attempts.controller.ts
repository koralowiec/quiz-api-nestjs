import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { GetUser } from '../users/user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { AttemptsService } from './attempts.service';
import { Attempt } from './attempt.entity';

@Controller()
@UseGuards(AuthGuard())
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Get()
  async getAttempts() {
    console.warn('not implemented');
  }

  @Post()
  async createAttempt(
    @GetUser() user: User,
    @Body(ValidationPipe) createAttemptDto: CreateAttemptDto,
  ): Promise<Attempt> {
    return this.attemptsService.createAttempt(createAttemptDto, user.id);
  }

  @Get('/:attemptId')
  async getAttempt(@Param('attemptId') attemptId: number): Promise<Attempt> {
    return this.attemptsService.getAttempt(attemptId);
  }
}
