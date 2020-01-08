import { Injectable } from '@nestjs/common';
import { CreateCheckedOptionDto } from './dto/create-checked-option.dto';
import { CorrectOptionDto } from './dto/correct-option.dto';
import { CheckedOptionRepository } from './checked-option.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckedOption } from './checked-option.entity';

@Injectable()
export class CheckedOptionsService {
  constructor(
    @InjectRepository(CheckedOptionRepository)
    private readonly checkedOptionRepository: CheckedOptionRepository,
  ) {}

  async createCheckedOptionsAndCheckCorrectness(
    answerId: number,
    checkedOptionsDto: CreateCheckedOptionDto[],
    correctOptionsDto: CorrectOptionDto[],
  ): Promise<{ areAllOptionsCorrect: boolean }> {
    const {
      checkedOptionsToCreate,
      areAllOptionsCorrect,
    } = this.compareCheckedOptionsWithCorrectOnesAndPrepareToBeSaved(
      checkedOptionsDto,
      correctOptionsDto,
    );

    await this.checkedOptionRepository.createCheckedOptions(
      answerId,
      checkedOptionsToCreate,
    );

    return { areAllOptionsCorrect };
  }

  private compareCheckedOptionsWithCorrectOnesAndPrepareToBeSaved(
    checkedOptionDtos: CreateCheckedOptionDto[],
    correctOptionDtos: CorrectOptionDto[],
  ): {
    areAllOptionsCorrect: boolean;
    checkedOptionsToCreate: Array<{
      createCheckedOptionDto: CreateCheckedOptionDto;
      correct: boolean;
    }>;
  } {
    let areAllOptionsCorrect = true;
    if (checkedOptionDtos.length !== correctOptionDtos.length) {
      areAllOptionsCorrect = false;
    }

    const checkedOptionsToCreate: Array<{
      createCheckedOptionDto: CreateCheckedOptionDto;
      correct: boolean;
    }> = [];

    for (const checkedOption of checkedOptionDtos) {
      const correctOptionWithIdOfCheckedOption = correctOptionDtos.find(
        option => checkedOption.optionId === option.correctOptionId,
      );

      if (!correctOptionWithIdOfCheckedOption) {
        areAllOptionsCorrect = false;
      }

      checkedOptionsToCreate.push({
        createCheckedOptionDto: checkedOption,
        correct: correctOptionWithIdOfCheckedOption ? true : false,
      });
    }
    return {
      areAllOptionsCorrect,
      checkedOptionsToCreate,
    };
  }

  async getCheckedOptions(answerId: number): Promise<CheckedOption[]> {
    return this.checkedOptionRepository.find({ where: { answerId } });
  }
}
