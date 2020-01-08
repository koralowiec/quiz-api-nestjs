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
    const checkedOption = this.createCheckedOptionObject(answerId, {
      createCheckedOptionDto,
      correct,
    });

    return checkedOption.save();
  }

  private createCheckedOptionObject(
    answerId: number,
    checkedOptionToCreate: {
      createCheckedOptionDto: CreateCheckedOptionDto;
      correct: boolean;
    },
  ): CheckedOption {
    const { optionId } = checkedOptionToCreate.createCheckedOptionDto;

    const checkedOption = new CheckedOption();
    checkedOption.answerId = answerId;
    checkedOption.optionId = optionId;
    checkedOption.correct = checkedOptionToCreate.correct;

    return checkedOption;
  }

  async createCheckedOptions(
    answerId: number,
    checkedOptionsToCreate: Array<{
      createCheckedOptionDto: CreateCheckedOptionDto;
      correct: boolean;
    }>,
  ) {
    const checkedOptions: CheckedOption[] = checkedOptionsToCreate.map(el =>
      this.createCheckedOptionObject(answerId, el),
    );

    await this.save(checkedOptions);
  }
}
