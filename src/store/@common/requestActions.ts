// import { Notification } from 'react-notification-system';
import { Action, ActionFunction1, createAction } from 'redux-actions';

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

export type ActionType<Params> = ActionFunction1<Params, Action<IRequestPayload>> & IAdditionalActions;

export const requestActions = <Params>(
  actionType: string,
  payloadCreator: ActionFunction1<Params, IRequestAction>
): ActionType<Params> => {
  const actionCreator = createAction<IRequestAction, Params>(actionType, payloadCreator) as ActionFunction1<
    Params,
    Action<IRequestPayload>
  > &
    IAdditionalActions;
  actionCreator.success = actionType + '_SUCCESS';
  actionCreator.fail = actionType + '_FAIL';
  return actionCreator;
};
