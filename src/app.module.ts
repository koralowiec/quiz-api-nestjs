import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { QuizzesModule } from './quizzes/quizzes.module';
import { OptionsModule } from './options/options.module';
import * as path from 'path';
import { QuestionsModule } from './questions/questions.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';

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
    RouterModule.forRoutes(routes),
    QuizzesModule,
    QuestionsModule,
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
