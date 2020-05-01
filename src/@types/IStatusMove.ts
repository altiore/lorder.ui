export enum TASK_STATUS_MOVE_TYPE {
  PREPARE = 'prepare',
  ASK_IMPROVE = 'ask_improve',

  START = 'start',
  ASK_PREPARE = 'ask_prepare',

  COMPLETE = 'complete',
  ASK_RESTART = 'ask_restart',

  ESTIMATE = 'estimate',
  ASK_RECHECK = 'ask_recheck',
}

export interface IStatusMove {
  id: number;
  projectRoleId: number;
  type: TASK_STATUS_MOVE_TYPE;
  fromId: number;
  toId: number;
}
