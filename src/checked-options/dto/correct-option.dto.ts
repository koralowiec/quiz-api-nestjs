import { IsNotEmpty } from 'class-validator';

export class CorrectOptionDto {
  @IsNotEmpty()
  correctOptionId: number;
}
