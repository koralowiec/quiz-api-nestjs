import { IsNotEmpty } from 'class-validator';

export class CreateAttemptDto {
  @IsNotEmpty()
  quizId: number;
}
