import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { Option } from './option.entity';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller()
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get()
  async getOptions(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Option[]> {
    return this.optionsService.getOptions(questionId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOption(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    return this.optionsService.createOption(questionId, createOptionDto);
  }

  @Post('/bulk')
  @UsePipes(ValidationPipe)
  async createOptionBulk(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() createOptionsDto: CreateOptionDto[],
  ): Promise<Option[]> {
    return this.optionsService.createOptions(questionId, createOptionsDto);
  }

  @Get('/:optionId')
  async getOption(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('optionId', ParseIntPipe) optionId: number,
  ): Promise<Option> {
    return this.optionsService.getOptionById(questionId, optionId);
  }

  @Delete('/:optionId')
  async deleteOption(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('optionId', ParseIntPipe) optionId: number,
  ): Promise<Option> {
    return this.optionsService.deleteOption(questionId, optionId);
  }

  @Patch('/:optionId')
  async updateOption(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('optionId', ParseIntPipe) optionId: number,
    @Body() updateOptionDto: UpdateOptionDto,
  ): Promise<Option> {
    return this.optionsService.updateOption(
      questionId,
      optionId,
      updateOptionDto,
    );
  }
}
