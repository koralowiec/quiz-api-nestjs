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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AnswersModule } from './answers/answers.module';
import { CheckedOptionsModule } from './checked-options/checked-options.module';
import { PhotosModule } from './photos/photos.module';

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
    AuthModule,
    UsersModule,
    AttemptsModule,
    AnswersModule,
    CheckedOptionsModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
