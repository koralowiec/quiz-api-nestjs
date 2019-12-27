import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
