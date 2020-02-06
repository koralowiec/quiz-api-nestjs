import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
