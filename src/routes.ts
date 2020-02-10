import { Routes } from 'nest-router';
import { AppModule } from './app.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';
import { AuthModule } from './auth/auth.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AnswersModule } from './answers/answers.module';
import { PhotosModule } from './photos/photos.module';

export const routes: Routes = [
  {
    path: 'api',
    module: AppModule,
    children: [
      {
        path: '/quizzes',
        module: QuizzesModule,
        children: [
          {
            path: '/:quizId/questions',
            module: QuestionsModule,
            children: [
              {
                path: '/:questionId/options',
                module: OptionsModule,
              },
            ],
          },
        ],
      },
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/attempts',
        module: AttemptsModule,
        children: [
          {
            path: '/:attemptId/answers',
            module: AnswersModule,
          },
        ],
      },
      {
        path: '/photos',
        module: PhotosModule,
      },
    ],
  },
];
