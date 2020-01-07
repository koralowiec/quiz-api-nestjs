import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnswerDto } from './create-answer.dto';
import { CreateCheckedOptionDto } from '../../checked-options/dto/create-checked-option.dto';

export class CreateAnswerWithCheckedOptionsDto {
  @ValidateNested()
  @Type(() => CreateAnswerDto)
  answer: CreateAnswerDto;

  @ValidateNested()
  @Type(() => CreateCheckedOptionDto)
  checkedOptions: CreateCheckedOptionDto[];
}
