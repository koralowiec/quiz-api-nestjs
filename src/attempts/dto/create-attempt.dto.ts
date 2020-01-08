import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateAttemptDto {
  @IsNotEmpty()
  @IsInt()
  quizId: number;
}
