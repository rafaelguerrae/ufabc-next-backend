export function findQuadFromDate(month: number) {
  if ([0, 1, 10, 11].includes(month)) return 1;
  if ([2, 3, 4].includes(month)) return 2;
  if ([5, 6, 7, 8, 9].includes(month)) return 3;
}

export function currentQuad(date?: Date): `${number}:${1 | 2 | 3}` {
  const { quad, year } = findQuarter(date);
  return `${year}:${quad}`;
}

type FindQuarter = {
  quad: 1 | 2 | 3;
  year: number;
};

export function findQuarter(date = new Date()): FindQuarter {
  const month = date.getMonth();
  const quadKey = findQuadFromDate(month);

  if (!quadKey) {
    // maybe sentry to track error
    throw new Error('Quad key cannot be empty');
  }

  const quarterMap = {
    1: {
      quad: 1 as const,
      year: date.getFullYear() + (month < 6 ? 0 : 1),
    },
    2: {
      quad: 2 as const,
      year: date.getFullYear(),
    },
    3: {
      quad: 3 as const,
      year: date.getFullYear(),
    },
  };

  return quarterMap[quadKey || month];
}

export function lastQuad(date: Date = new Date()): FindQuarter {
  const season = findQuarter(date);

  if (season.quad === 1) {
    return { year: season.year - 1, quad: 3 };
  }

  return { year: season.year, quad: (season.quad - 1) as FindQuarter['quad'] };
}
