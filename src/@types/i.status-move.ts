export enum TASK_STATUS_MOVE_TYPE {
  PUSH_FORWARD = 'push_forward',
  BRING_BACK = 'bring_back',
  JUMP = 'JUMP',
}

export interface IStatusMove {
  id: number;
  projectRoleId: number;
  type: TASK_STATUS_MOVE_TYPE;
  fromName: string;
  toName: string;
}
