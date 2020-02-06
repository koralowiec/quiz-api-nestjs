import { Repository, EntityRepository } from 'typeorm';
import { Option } from './option.entity';
import { CreateOptionDto } from './dto/create-option.dto';

@EntityRepository(Option)
export class OptionRepository extends Repository<Option> {
  async createOption(
    questionId: number,
    optionDto: CreateOptionDto,
  ): Promise<Option> {
    const option = this.createOptionObject(questionId, optionDto);

    const savedOption = await option.save();
    console.log('savedOption', savedOption);
    return savedOption;
  }

  async createOptions(
    questionId: number,
    optionDtoArray: CreateOptionDto[],
  ): Promise<Option[]> {
    const options = optionDtoArray.map(optionDto =>
      this.createOptionObject(questionId, optionDto),
    );

    return await this.save(options);
  }

  private createOptionObject(
    questionId: number,
    optionDto: CreateOptionDto,
  ): Option {
    console.log('optionDto', optionDto);
    const { text, isCorrect } = optionDto;

    const option = new Option();
    option.text = text;
    option.isCorrect = isCorrect;
    option.questionId = questionId;

    console.log('option', option);
    return option;
  }
}
