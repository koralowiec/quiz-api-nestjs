import { IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  isCorrect: boolean;
}
