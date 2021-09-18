export enum ROLE_FLOW {
  ARCHITECT = 'architect',
  LEAD_DEVELOPER = 'dev-full-lead',
  FS_DEVELOPER = 'dev-full',
  TESTER = 'qa-engineer',
  DESIGNER = 'designer',
  FE_DEVELOPER = 'dev-front-end',
  BE_DEVELOPER = 'dev-back-end',
  REVIEWER = 'reviewer',
}

export const MAP_ROLE: { [key in ROLE_FLOW]: string } = {
  [ROLE_FLOW.ARCHITECT]: 'Архитектор',
  [ROLE_FLOW.LEAD_DEVELOPER]: 'Тим лид',
  [ROLE_FLOW.FS_DEVELOPER]: 'Ведущий программист',
  [ROLE_FLOW.DESIGNER]: 'Дизайнер',
  [ROLE_FLOW.TESTER]: 'Тестировщик',
  [ROLE_FLOW.FE_DEVELOPER]: 'Front End - программист',
  [ROLE_FLOW.BE_DEVELOPER]: 'Back End - программист',
  [ROLE_FLOW.REVIEWER]: 'Наблюдатель',
};

export interface IUserRole {
  id: string;
  name: ROLE_FLOW;
}
