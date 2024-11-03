import { randomUUID } from 'node:crypto';
import { type Job, type JobsOptions, Queue, type RedisOptions } from 'bullmq';
import ms from 'ms';
import { Config } from '@/config/config.js';
import { NEXT_JOBS, NEXT_QUEUE_JOBS } from './definitions.js';
import type { JobParameters, NextJobNames } from './NextWorker.js';
import { FastifyAdapter } from '@bull-board/fastify';
import type { FastifyInstance } from 'fastify';
import { boardUiPath, createBoard } from './board.js';

interface NextJob {
  setup(): Promise<void>;
  close(): Promise<void>;
  clean(grace: number, limit: number, type?: string): Promise<string[]>;
  cancel(jobId: string): Promise<void>;
  dispatch<T extends NextJobNames>(
    jobName: T,
    jobParameters: JobParameters<T>,
  ): Promise<Job>;
}

export type NextQueue = Record<
  string,
  Queue<JobParameters<NextJobNames> | null, unknown, NextJobNames>
>;

export class NextJobs implements NextJob {
  private readonly queues: NextQueue = {};
  public readonly queueBoard = FastifyAdapter;

  private readonly REDIS_URL = new URL(Config.REDIS_CONNECTION_URL!);

  private readonly RedisConnection = {
    username: this.REDIS_URL.username,
    password: this.REDIS_URL.password,
    host: this.REDIS_URL.hostname,
    port: Number(this.REDIS_URL.port),
    lazyConnect: true,
  } satisfies RedisOptions;

  constructor() {
    for (const queuename of Object.keys(NEXT_QUEUE_JOBS)) {
      const queue = new Queue<
        JobParameters<NextJobNames> | null,
        unknown,
        NextJobNames
      >(queuename, {
        connection: {
          ...this.RedisConnection,
        },
        defaultJobOptions: {
          attempts: 1,
        },
      });
      this.queues[queuename] = queue;
    }
  }

  private getQueue(jobName: NextJobNames) {
    return this.queues[NEXT_JOBS[jobName].queue];
  }

  async setup() {
    const isTest = Config.NODE_ENV === 'test';
    if (isTest) {
      return;
    }

    for (const [jobname, jobDefinition] of Object.entries(NEXT_JOBS)) {
      if ('every' in jobDefinition) {
        const queue = this.queues[jobDefinition.queue];
        await queue.add(jobname as NextJobNames, null, {
          repeat: {
            every: ms(jobDefinition.every),
          },
        });
      }
    }
  }

  dispatch<T extends NextJobNames>(
    jobName: T,
    jobParameters: JobParameters<T>,
  ) {
    const jobOptions = {
      jobId: randomUUID(),
      removeOnComplete: true,
    } satisfies JobsOptions;

    return this.getQueue(jobName).add(jobName, jobParameters, jobOptions);
  }

  schedule<T extends NextJobNames>(
    jobName: T,
    jobParameters?: JobParameters<T>,
    { toWait, toWaitInMs }: { toWait?: string; toWaitInMs?: number } = {},
  ) {
    const options: JobsOptions = {
      jobId: randomUUID(),
    };

    if (toWait) {
      const convertedToWait = ms(toWait);
      if (!convertedToWait) {
        throw new Error(`Invalid format to scheduleJob: ${toWait}`);
      }

      options.delay = convertedToWait;
    }

    if (toWaitInMs) {
      options.delay = toWaitInMs;
    }

    return this.getQueue(jobName).add(jobName, jobParameters, options);
  }

  async cancel(jobId: string) {
    for (const queue of Object.values(this.queues)) {
      const job = await queue.getJob(jobId);
      if (job) {
        try {
          await job.remove();
          return;
        } catch {
          throw new Error(`Could not cancel job: ${jobId}`);
        }
      }
    }

    throw new Error(`Invalid jobId: ${jobId}`);
  }

  async close() {
    const jobsToClose = Object.values(this.queues);
    await Promise.all(jobsToClose.map((queue) => queue.close()));
  }

  async clean(
    grace: number,
    limit: number,
    type?:
      | 'completed'
      | 'wait'
      | 'active'
      | 'paused'
      | 'prioritized'
      | 'delayed'
      | 'failed',
  ) {
    const jobsToClean = Object.values(this.queues);
    return (
      await Promise.all(
        jobsToClean.map((queue) => queue.clean(grace, limit, type)),
      )
    ).flat();
  }

  board(app: FastifyInstance) {
    const nextBoard = createBoard(Object.values(this.queues));
    app.register(nextBoard.registerPlugin(), {
      prefix: boardUiPath,
      basePath: boardUiPath,
      logLevel: 'silent',
    });
  }
}

export const nextJobs = new NextJobs();
