import { IsNotEmpty } from 'class-validator';

export class CreateCheckedOptionDto {
  @IsNotEmpty()
  optionId: number;
}
