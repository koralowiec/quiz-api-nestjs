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
    const numberOfCorrectOptions = correctOptionsDto.length;

    let areAllOptionsCorrect = true;
    if (checkedOptionsDto.length !== numberOfCorrectOptions) {
      areAllOptionsCorrect = false;
    }

    for (const checkedOption of checkedOptionsDto) {
      const correctOptionWithIdOfCheckedOption = correctOptionsDto.find(
        option => checkedOption.optionId === option.correctOptionId,
      );

      if (!correctOptionWithIdOfCheckedOption) {
        areAllOptionsCorrect = false;
      }

      // TODO save all checked options instead of saving one by one
      await this.checkedOptionRepository.createCheckedOption(
        answerId,
        checkedOption,
        correctOptionWithIdOfCheckedOption ? true : false,
      );
    }

    return { areAllOptionsCorrect };
  }

  async getCheckedOptions(answerId: number): Promise<CheckedOption[]> {
    return this.checkedOptionRepository.find({ where: { answerId } });
  }
}
