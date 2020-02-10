import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  snippet: string;

  @IsOptional()
  @IsNumber()
  photoId: number;
}
