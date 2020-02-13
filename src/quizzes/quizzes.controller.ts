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
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Roles } from 'src/users/roles.decorator';
import { UserRole } from 'src/users/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { GetUser } from 'src/users/user.decorator';
import { User } from '../users/user.entity';
import { ParseBoolPipe } from '../common/pipes/parse-bool.pipe';

@Controller()
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getQuizzes(
    @Query('ownerablility', new ParseBoolPipe()) ownerablility: boolean,
    @Query('onlyAvailable', new ParseBoolPipe()) onlyAvailable: boolean,
    @GetUser() user: User | undefined,
  ): Promise<Quiz[]> {
    const queries = { ownerablility, onlyAvailable };
    return await this.quizzesService.getQuizzes(user, queries);
  }

  @Post()
  @Roles(UserRole.QUIZ_MAKER, UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @GetUser() user: User,
  ) {
    return await this.quizzesService.createQuiz(createQuizDto, user);
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

  @Patch('/:quizId/available')
  updateAvailability(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body('available') available: boolean,
  ) {
    return this.quizzesService.updateQuizAvailability(quizId, available);
  }
}
