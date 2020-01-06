import { Module } from '@nestjs/common';
import { CheckedOptionsService } from './checked-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckedOption } from './checked-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckedOption])],
  providers: [CheckedOptionsService],
})
export class CheckedOptionsModule {}
