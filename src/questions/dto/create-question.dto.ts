import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateOptionDto } from '../../options/dto/create-option.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  snippet: string;

  @IsOptional()
  @IsNumber()
  photoId: number;

  @IsOptional()
  options: CreateOptionDto[];
}
