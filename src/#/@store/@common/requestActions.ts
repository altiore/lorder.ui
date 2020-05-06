// import { Notification } from 'react-notification-system';
import {
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunction2,
  ActionFunction3,
  ActionFunction4,
  createAction,
} from 'redux-actions';

export interface IRequestPayload<D = any, P = any> {
  data?: D;
  method?: string;
  params?: P;
  url: string;
}

export interface IRequestAction<D = any, P = any> {
  request: IRequestPayload<D, P>;
}

interface IAdditionalActions {
  fail: string;
  success: string;
}

export type ActionType<P1 = any, P2 = any, P3 = any, P4 = any> = ActionFunction0<Action<IRequestPayload>> &
  ActionFunction1<P1, Action<IRequestPayload>> &
  ActionFunction2<P1, P2, Action<IRequestPayload>> &
  ActionFunction3<P1, P2, P3, Action<IRequestPayload>> &
  ActionFunction4<P1, P2, P3, P4, Action<IRequestPayload>>;

export const requestActions = <P1 = any, P2 = any, P3 = any, P4 = any>(
  actionType: string,
  payloadCreator:
    | ActionFunction0<IRequestAction>
    | ActionFunction1<P1, IRequestAction>
    | ActionFunction2<P1, P2, IRequestAction>
    | ActionFunction3<P1, P2, P3, IRequestAction>
    | ActionFunction4<P1, P2, P3, P4, IRequestAction>
): ActionType<P1, P2, P3, P4> & IAdditionalActions => {
  const actionCreator = createAction<any, P1, P2, P3, P4>(actionType, payloadCreator) as ActionType<P1, P2, P3, P4> &
    IAdditionalActions;
  actionCreator.success = actionType + '_SUCCESS';
  actionCreator.fail = actionType + '_FAIL';
  return actionCreator;
};
