import { HistoryModel } from '@/models/History.js';
import { GraduationHistoryModel } from '@/models/GraduationHistory.js';
import { GraduationModel } from '@/models/Graduation.js';
import { CourseStatsRepository } from './courseStats.repository.js';
import { CourseStatsService } from './courseStats.service.js';
import { CourseStatsHandlers } from './courseStats.handlers.js';
import {
  gradesStatsSchema,
  graduationHistorySchema,
  userGraduationStatsSchema,
} from './courseStats.schema.js';
import type { FastifyInstance } from 'fastify';

export async function courseStatsRoute(app: FastifyInstance) {
  const courseStatsRepository = new CourseStatsRepository(
    HistoryModel,
    GraduationHistoryModel,
    GraduationModel,
  );
  const courseStatsService = new CourseStatsService(courseStatsRepository);
  app.decorate('courseStatsService', courseStatsService);
  const courseStatsHandler = new CourseStatsHandlers(courseStatsService);

  app.get(
    '/grades',
    { schema: gradesStatsSchema },
    courseStatsHandler.gradesStats,
  );

  app.get<{ Querystring: { ra: number } }>(
    '/history',
    { schema: graduationHistorySchema },
    courseStatsHandler.graduationHistory,
  );

  app.get(
    '/user/grades',
    { schema: userGraduationStatsSchema },
    courseStatsHandler.userGraduationStats,
  );
}
