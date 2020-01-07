import { EntityRepository, Repository } from 'typeorm';
import { CheckedOption } from './checked-option.entity';
import { CreateCheckedOptionDto } from './dto/create-checked-option.dto';

@EntityRepository(CheckedOption)
export class CheckedOptionRepository extends Repository<CheckedOption> {
  async createCheckedOption(
    answerId: number,
    createCheckedOptionDto: CreateCheckedOptionDto,
    correct: boolean,
  ): Promise<CheckedOption> {
    const { optionId } = createCheckedOptionDto;

    const checkedOption = new CheckedOption();
    checkedOption.answerId = answerId;
    checkedOption.optionId = optionId;
    checkedOption.correct = correct;

    return checkedOption.save();
  }
}
