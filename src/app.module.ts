import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { QuizzesModule } from './quizzes/quizzes.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('typeorm');
      },
      inject: [ConfigService],
    }),
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
