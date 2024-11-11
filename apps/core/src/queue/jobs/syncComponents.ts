'import { ComponentModel, type Component } from '@/models/Component.js';
import { SubjectModel } from '@/models/Subject.js';
import { ufProcessor } from '@/services/ufprocessor.js';
import { currentQuad, generateIdentifier, logger } from '@next/common';
import type { AnyBulkWriteOperation } from 'mongoose';

type NextComponent = Omit<
  Component,
  | 'alunos_matriculados'
  | 'before_kick'
  | 'after_kick'
  | 'createdAt'
  | 'updatedAt'
>;

export async function syncComponents() {
  const tenant = currentQuad();
  const [year, quad] = tenant.split(':');
  const components = await ufProcessor.getComponents();

  if (!components) {
    logger.error({ components }, 'Could not get components');
    return {
      msg: 'Could not get components',
      components,
    };
  }

  const dbSubjects = await SubjectModel.find({}, { name: 1 }).lean();
  const subjectsMap = new Map(
    dbSubjects.map((subject) => [
      subject.name.toLocaleLowerCase(),
      subject._id,
    ]),
  );

  const subjects = new Set(
    dbSubjects.map(({ name }) => name.toLocaleLowerCase()),
  );
  const missingSubjects = components.filter(({ name }) => !subjects.has(name));
  const missing = [...new Set(missingSubjects.map(({ name }) => name))];

  if (missingSubjects.length > 0) {
    return {
      msg: 'missing subjects, check syncSubjects',
      missing,
    };
  }

  const bulkOperations: AnyBulkWriteOperation<Component>[] = [];

  for (const component of components) {
    const nextComponent: NextComponent = {
      codigo: component.UFComponentCode,
      disciplina_id: component.UFComponentId,
      campus: component.campus,
      disciplina: component.name,
      season: tenant,
      turma: component.turma,
      turno: component.turno,
      vagas: component.vacancies,
      ideal_quad: false,
      identifier: '',
      quad: Number(quad),
      year: Number(year),
      subject: subjectsMap.get(component.name.toLocaleLowerCase())!,
      obrigatorias: component.courses.map((course) => course.UFCourseId),
    };

    // @ts-expect-error refactoring
    nextComponent.identifier = generateIdentifier(nextComponent);

    bulkOperations.push({
      updateOne: {
        filter: {
          season: tenant,
          identifier: nextComponent.identifier,
          disciplina_id: component.UFComponentId,
        },
        update: {
          $set: {
            ...nextComponent,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            alunos_matriculados: [],
            after_kick: [],
            before_kick: [],
          },
        },
        upsert: true,
      },
    });
  }

  if (bulkOperations.length > 0) {
    const result = await ComponentModel.bulkWrite(bulkOperations);
    logger.info({
      msg: 'components updated/created',
      modifiedCount: result.modifiedCount,
      insertedCount: result.insertedCount,
      upsertedCount: result.upsertedCount,
    });

    return {
      msg: 'components updated/created',
      modifiedCount: result.modifiedCount,
      insertedCount: result.insertedCount,
      upsertedCount: result.upsertedCount,
    };
  }

  logger.info('No components needed updating or creation');
  return {
    msg: 'No changes needed',
    modifiedCount: 0,
    insertedCount: 0,
    upsertedCount: 0,
  };
}
