import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionRepository } from './option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Option, OptionRepository])],
  providers: [OptionsService],
  controllers: [OptionsController],
})
export class OptionsModule {}
