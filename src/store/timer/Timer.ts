import NodeJSTimerType = NodeJS.Timer;

export class Timer {
  public projectId?: number | string = undefined;
  public taskId?: number | string = undefined;
  public time: number = 0;
  public timer?: NodeJSTimerType = undefined;
  public userWorkId?: number | string = undefined;
}
