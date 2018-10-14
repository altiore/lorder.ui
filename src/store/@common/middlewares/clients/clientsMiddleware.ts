import { AxiosRequestConfig, AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Notification } from 'react-notification-system';
import { error, show } from 'react-notification-system-redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { stopAsyncValidation } from 'redux-form';

import { logOut, userBearerKey } from 'src/store/identity';
import { parseFormErrorsFromResponse } from '../../helpers';
import { api } from './api';

export interface IStoreInfo {
  getState: () => any;
  dispatch: (fn: any) => any;
  getSourceAction: () => any;
}

function getError(action: any): false | Notification {
  const errorFromAction = get(action, 'meta.previousAction.payload.error');
  if (typeof errorFromAction === 'object') {
    return {
      level: 'error',
      position: 'tr',
      ...errorFromAction,
    };
  } else {
    if (errorFromAction === false) {
      return false;
    }
    return {
      level: 'error',
      message: errorFromAction || get(action, 'error.response.data.message', 'Неизвестная ошибка'),
      position: 'tr',
      title: errorFromAction || get(action, 'error.response.data.message', 'Неизвестная ошибка'),
    };
  }
}

function getSuccess(action: any): false | Notification {
  const successFromAction = get(action, 'meta.previousAction.payload.success');
  if (typeof successFromAction === 'object') {
    return {
      level: 'success',
      position: 'tr',
      ...successFromAction,
    };
  } else {
    if (successFromAction) {
      return {
        level: 'success',
        message: successFromAction,
        position: 'tr',
        title: successFromAction,
      };
    }
    return false;
  }
}

export default multiClientMiddleware(
  {
    default: {
      client: api,
    },
  },
  {
    interceptors: {
      request: [
        ({ getState, dispatch, getSourceAction }: IStoreInfo, req: AxiosRequestConfig) => {
          const bearerKey = userBearerKey(getState());
          if (bearerKey) {
            req.headers.Authorization = 'Bearer ' + bearerKey;
          }

          return req;
        },
      ],
      response: [
        ({ getState, dispatch, getSourceAction }: IStoreInfo, res: AxiosResponse) => {
          return res;
        },
      ],
    },
    onComplete: ({ action, next, getState, dispatch }: any, actionOptions: any) => {
      const status = get(action, 'error.response.status', get(action, 'payload.status'));
      if (status >= 400) {
        if (status === 401) {
          dispatch(
            error({
              message: 'Пожалуйста, авторизуйтесь снова, чтоб продолжить пользоваться сервисом',
              position: 'tr',
              title: 'Срок действия ключа истек!',
            })
          );
          dispatch(logOut());
        } else {
          // Если форма указана, то вставляем ошибки в форму
          const formName = get(action, 'meta.previousAction.payload.form');
          if (formName) {
            dispatch(stopAsyncValidation(formName, parseFormErrorsFromResponse(action)));
          }
          const showError = getError(action);
          if (showError) {
            dispatch(show(showError, showError.level));
          }
        }
      } else {
        const showSuccess = getSuccess(action);
        if (showSuccess) {
          dispatch(show(showSuccess, showSuccess.level));
        }
      }
    },
    returnRejectedPromiseOnError: true,
  }
);
