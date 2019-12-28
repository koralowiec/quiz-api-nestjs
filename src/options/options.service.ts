import { Injectable, NotFoundException } from '@nestjs/common';
import { OptionRepository } from './option.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { Option } from './option.entity';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(OptionRepository)
    private readonly optionRepository: OptionRepository,
  ) {}

  async createOption(
    questionId: number,
    createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    return await this.optionRepository.createOption(
      questionId,
      createOptionDto,
    );
  }

  async createOptions(questionId: number, optionDtoArray: CreateOptionDto[]) {
    return await this.optionRepository.createOptions(
      questionId,
      optionDtoArray,
    );
  }

  async getOptions(questionId: number): Promise<Option[]> {
    return await this.optionRepository.find({
      where: { questionId },
    });
  }

  async getOptionById(questionId: number, optionId: number): Promise<Option> {
    const found = await this.optionRepository.findOne({
      where: { questionId, id: optionId },
    });

    if (!found) {
      throw new NotFoundException(
        `Option with id: ${optionId} and questionId: ${questionId} doesn't exist`,
      );
    }

    return found;
  }

  async deleteOption(questionId: number, optionId: number): Promise<Option> {
    const optionToDelete = await this.getOptionById(questionId, optionId);

    return await optionToDelete.remove();
  }

  async updateOption(
    questionId: number,
    optionId: number,
    updateOptionDto: UpdateOptionDto,
  ): Promise<Option> {
    const optionToUpdate = await this.getOptionById(questionId, optionId);

    const { text, isCorrect } = updateOptionDto;
    optionToUpdate.text = text;
    optionToUpdate.isCorrect = isCorrect;

    return await optionToUpdate.save();
  }
}
