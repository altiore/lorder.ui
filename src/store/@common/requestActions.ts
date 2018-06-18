import { Action, ActionFunction1, createAction } from 'redux-actions';

export interface IRequestPayload {
  data?: any;
  method?: string;
  params?: any;
  url: string;
}

export interface IRequestAction {
  request: IRequestPayload;
}

interface IAdditionalActions {
  fail: string;
  success: string;
}

export const requestActions = <Params>(actionType: string, payloadCreator: ActionFunction1<Params, IRequestAction>): ActionFunction1<Params, Action<IRequestPayload>> & IAdditionalActions => {
  const actionCreator = createAction<IRequestAction, Params>(actionType, payloadCreator) as ActionFunction1<Params, Action<IRequestPayload>> & IAdditionalActions;
  actionCreator.success = actionType + '_SUCCESS';
  actionCreator.fail = actionType + '_FAIL';
  return actionCreator;
};