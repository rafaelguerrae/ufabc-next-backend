import type { FastifyZodOpenApiSchema } from 'fastify-zod-openapi';
import { z } from 'zod';

export const syncComponentsSchema = {
  body: z.object({
    hash: z.string().optional(),
    season: z.string(),
    // util to ignore when UFABC send bad data
    ignoreErrors: z.boolean().default(false),
    withUpsert: z.boolean().default(false),
  }),
} satisfies FastifyZodOpenApiSchema;
