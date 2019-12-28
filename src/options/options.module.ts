import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';

@Module({
  providers: [OptionsService],
  controllers: [OptionsController]
})
export class OptionsModule {}
