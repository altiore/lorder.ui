export enum ROLE_FLOW {
  ARCHITECT = 'architect',
  DEVELOPER = 'dev-full',
  TESTER = 'qa-engineer',
  DESIGNER = 'designer',
  FE_DEVELOPER = 'dev-front-end',
  BE_DEVELOPER = 'dev-back-end',
  REVIEWER = 'reviewer',
}

export interface IUserRole {
  id: string;
  name: ROLE_FLOW;
}
