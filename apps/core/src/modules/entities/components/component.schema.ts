import type { FastifySchema } from 'fastify';
import { z } from 'zod';

export const listComponentsSchema = {
  tags: ['Components'],
  description: 'Rota para listar as disciplinas do quadrimestre atual',
  response: {
    200: {},
  },
} satisfies FastifySchema;

export const listComponentsKicksSchema = {
  tags: ['Components'],
  description: 'Rota visualizar os chutes de cada disciplina',
  response: {
    200: z
      .object({
        studentId: z.number().int().describe('Id do aluno para a UFABC'),
        cp: z.number().describe('CP do aluno'),
        ik: z.number(),
        reserva: z.boolean(),
        turno: z.enum(['Matutino', 'Noturno']),
        curso: z.string().describe('Curso do aluno'),
        kicked: z
          .boolean()
          .describe('Variável que diz se o aluno foi ou não chutado'),
      })
      .array(),
  },
} satisfies FastifySchema;
