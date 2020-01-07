import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';
import { CheckedOptionsService } from '../checked-options/checked-options.service';
import { CreateAnswerWithCheckedOptionsDto } from './dto/create-answer-with-checked-options.dto';
import { OptionsService } from '../options/options.service';
import { CorrectOptionDto } from '../checked-options/dto/correct-option.dto';
import { Option } from 'src/options/option.entity';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerRepository)
    private readonly answerRepository: AnswerRepository,
    private readonly checkedOptionsService: CheckedOptionsService,
    private readonly optionsService: OptionsService,
  ) {}

  async getAnswerById(answerId: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne(answerId);

    if (!answer) {
      throw new NotFoundException(`Answer with id: ${answerId} not found`);
    }

    return answer;
  }

  // TODO forbid saving multiple answers to the same question in the same attempt
  async saveAnswerWithCheckedOptions(
    attemptId: number,
    createAnswerWithCheckedOptionsDto: CreateAnswerWithCheckedOptionsDto,
  ): Promise<Answer> {
    const { answer, checkedOptions } = createAnswerWithCheckedOptionsDto;

    const createdAnswer = await this.answerRepository.createAnswerWithCorrectColumnSetToNull(
      attemptId,
      answer,
    );

    const correctOptions = await this.getCorrectOptions(answer.questionId);

    const {
      areAllOptionsCorrect,
    } = await this.checkedOptionsService.createCheckedOptionsAndCheckCorrectness(
      createdAnswer.id,
      checkedOptions,
      correctOptions,
    );

    createdAnswer.correct = areAllOptionsCorrect;
    return createdAnswer.save();
  }

  private async getCorrectOptions(
    questionId: number,
  ): Promise<CorrectOptionDto[]> {
    const correctOptions = await this.optionsService.getOptionsByCorrectness(
      questionId,
      true,
    );

    const correctOptionsDto: CorrectOptionDto[] = correctOptions.map(option =>
      this.optionToCorrectOptionDto(option),
    );

    return correctOptionsDto;
  }

  private optionToCorrectOptionDto(option: Option): CorrectOptionDto {
    const correctOptionDto = new CorrectOptionDto();
    correctOptionDto.correctOptionId = option.id;

    return correctOptionDto;
  }
}
