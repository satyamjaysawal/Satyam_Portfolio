/** Career start: 1 December 2022 (Capgemini) */
export const CAREER_START_DATE = new Date(2022, 11, 1, 0, 0, 0, 0);

export const CAREER_START_LABEL = '1 Dec 2022';

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function getExperienceYears() {
  const elapsed = Date.now() - CAREER_START_DATE.getTime();
  return String(Math.max(0, Math.ceil(elapsed / MS_PER_YEAR)));
}

export function getExperienceLabel() {
  return `${getExperienceYears()} Years`;
}

export function getExperienceText() {
  return `${getExperienceYears()} years`;
}