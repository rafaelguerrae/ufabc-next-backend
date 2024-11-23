import { camelCase, chunk as lodashChunk, startCase } from 'lodash-es';
import latinize from 'latinize';

// TODO: implement IDEAL_QUAD
// TODO: this is not an _actual_ disciplina

export type Disciplina = {
  nome: string;
  id: number;
  ra: number;
  year: number;
  quad: number;
  obrigatorias: number[];
  obrigatoriedades: Array<{
    curso_id: number;
    obrigatoriedade: 'limitada' | 'obrigatoria' | 'livre';
  }>;
  campus: 'santo andre' | 'sao bernardo' | 'sbc' | 'sa';
  turno: 'noturno' | 'diurno' | 'tarde' | null;
  horarios:
    | string
    | {
        horas: string[];
      }[];
  turma: string;
  disciplina: string;
  disciplina_id: number | '-';
  teoria: string | null;
  pratica: string | null;
};

// This convert an disciplina from the .json from matriculas.ufabc
export function convertUfabcDisciplinas(disciplina: Disciplina) {
  const clonedDisciplinas = structuredClone(disciplina);
  // @ts-expect-error Will not set as undefined, to avoid letting the type too widen
  clonedDisciplinas.campus = undefined;
  // @ts-expect-error Will not set as undefined, to avoid letting the type too widen
  clonedDisciplinas.turno = undefined;

  clonedDisciplinas.obrigatorias = clonedDisciplinas.obrigatoriedades?.map(
    (item) => item.curso_id,
  );

  let afterNoon = false;

  const isNoon =
    clonedDisciplinas.horarios &&
    typeof clonedDisciplinas.horarios === 'object';

  // handle horarios based on pdf or json
  if (isNoon) {
    // @ts-expect-error ts is hard sometimes
    const startHours = clonedDisciplinas.horarios[0]?.horas || [];
    afterNoon = ['14:00', '15:00', '16:00', '17:00'].some((hour) =>
      startHours.includes(hour),
    );
  } else if (
    clonedDisciplinas.horarios &&
    typeof clonedDisciplinas.horarios === 'string'
  ) {
    clonedDisciplinas.horarios = removeLineBreaks(clonedDisciplinas.horarios);

    const matched = clonedDisciplinas.horarios.match(/\d{2}:\d{2}/g);

    // @ts-ignore
    if (matched?.length % 2 === 0) {
      const hours = lodashChunk(matched, 2);

      for (const hour of hours) {
        const [start] = hour.map((h) => Number.parseInt(h.split(':')[0]!));
        if (start! >= 12 && start! < 18) {
          afterNoon = true;
        }
      }
    }
  }

  // trabalha nas disciplinas
  if (!clonedDisciplinas.nome) {
    return clonedDisciplinas;
  }

  let turnoIndex: number | null = null;
  let breakRule = '-';

  let splitted = removeLineBreaks(clonedDisciplinas.nome).split(breakRule);
  if (splitted.length === 1) {
    breakRule = ' ';
    // @ts-ignore
    splitted = splitted[0]?.split(/\s+/);
  }
  splitted.forEach((item, i) => {
    // Theres probably a bug in here
    clonedDisciplinas.campus = clonedDisciplinas.campus || extractCampus(item);
    clonedDisciplinas.turno = clonedDisciplinas.turno || extractTurno(item);

    if (
      (clonedDisciplinas.turno || clonedDisciplinas.campus) &&
      turnoIndex === null
    ) {
      turnoIndex = i;
    }
  });

  if (afterNoon && !clonedDisciplinas.turno) {
    // Theres probably a bug here too
    clonedDisciplinas.turno = 'tarde';
  }

  if (!clonedDisciplinas.campus) {
    const secondPath = splitted.slice(turnoIndex! + 1, splitted.length);
    // @ts-ignore
    clonedDisciplinas.campus = extractCampus(secondPath.join(breakRule));
  }

  // cut until the index we found
  splitted = splitted.slice(0, turnoIndex!);

  // separa a turma da disciplina
  const ufabcDisciplina = splitted.join('-').split(/\s+/).filter(Boolean);
  clonedDisciplinas.turma = ufabcDisciplina.at(-1)!;
  ufabcDisciplina.pop();

  // fix disciplina
  const rawUabcDisciplina = ufabcDisciplina.join(' ').trim();
  clonedDisciplinas.disciplina = toTitleCase(rawUabcDisciplina);
  clonedDisciplinas.disciplina_id = clonedDisciplinas.id;

  cleanTeoriaAndPraticaFields(clonedDisciplinas);

  return clonedDisciplinas;
}

const removeLineBreaks = (str: string) => str?.replace(/\r?\n|\r/g, ' ');

const extractTurno = (disciplina: string) => {
  // TODO: include `vespertino`
  const lowerCaseDisciplinas = disciplina?.toLowerCase();
  if (
    lowerCaseDisciplinas?.includes('diurno') ||
    lowerCaseDisciplinas?.includes('matutino')
  ) {
    return 'diurno';
  }

  if (lowerCaseDisciplinas?.includes('noturno')) {
    return 'noturno';
  }

  return null;
};

const extractCampus = (disciplina: string) => {
  const min = latinize(disciplina.toLowerCase());
  if (!min) {
    return null;
  }
  if (/.*santo\s+andre.*/.test(min)) {
    return 'santo andre';
  }

  if (/.*sao\s+bernardo.*/.test(min)) {
    return 'sao bernardo';
  }

  return null;
};

const cleanTeacher = (teacher: string) => {
  return startCase(camelCase(teacher))
    .replaceAll(/-+.*?-+/g, '')
    .replaceAll(/\(+.*?\)+/g, '');
};

function cleanTeoriaAndPraticaFields(disciplina: Disciplina) {
  disciplina.teoria = disciplina.teoria ?? null;
  disciplina.pratica = disciplina.pratica ?? null;

  // edge case in parseTeachers where the xlsx, sets the empty teoria/pratica to 0
  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  if (disciplina.teoria == '0') {
    disciplina.teoria = null;
  }

  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  if (disciplina.pratica == '0') {
    disciplina.pratica = null;
  }

  if (disciplina.teoria !== null) {
    disciplina.teoria = cleanTeacher(removeLineBreaks(disciplina.teoria));
  }
  if (disciplina.pratica !== null) {
    disciplina.pratica = cleanTeacher(removeLineBreaks(disciplina.pratica));
  }
}

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replaceAll(/(?:^|\s)\w/g, (match) => match.toUpperCase());
};
