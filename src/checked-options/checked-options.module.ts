import { Module } from '@nestjs/common';
import { CheckedOptionsService } from './checked-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckedOption } from './checked-option.entity';
import { CheckedOptionRepository } from './checked-option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CheckedOption, CheckedOptionRepository])],
  providers: [CheckedOptionsService],
  exports: [CheckedOptionsService],
})
export class CheckedOptionsModule {}
