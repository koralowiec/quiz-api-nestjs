import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async getQuestions(quizId: number): Promise<Question[]> {
    return await this.questionRepository.find({ where: { quizId } });
  }

  async getQuestion(quizId: number, questionId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
        quizId,
      },
    });

    if (!question) {
      throw new NotFoundException(
        `Question with id: ${questionId} and quizId: ${quizId} doesn't exist`,
      );
    }

    return question;
  }

  async createQuestion(
    quizId: number,
    questionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionRepository.createQuestion(quizId, questionDto);
  }

  async deleteQuestion(quizId: number, questionId: number): Promise<Question> {
    const questionToDelete = await this.getQuestion(quizId, questionId);

    return await questionToDelete.remove();
  }

  async updateQuestion(
    quizId: number,
    questionId: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const { description } = updateQuestionDto;

    const questionToUpdate = await this.getQuestion(quizId, questionId);

    questionToUpdate.description = description;

    await questionToUpdate.save();
    return questionToUpdate;
  }
}
