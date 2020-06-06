import { Notification } from 'react-notification-system';
import { error, show } from 'react-notification-system-redux';

import get from 'lodash/get';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { stopAsyncValidation } from 'redux-form';

import { logOut, userBearerKey } from '#/@store/identity';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { parseFormErrorsFromResponse } from '../../helpers';
import { api } from './api';
import { intl } from './intl';

import { getUuid } from '@utils/getUuid';

const objectToFormData = require('object-to-formdata');

export interface IStoreInfo {
  getState: () => any;
  dispatch: (fn: any) => any;
  getSourceAction: () => any;
}

function getError(action: any, status: number): false | Notification {
  const errorFromAction =
    get(action, 'meta.previousAction.payload.error') || get(action, 'meta.previousAction.payload.fail');
  if (typeof errorFromAction === 'object') {
    return {
      level: 'error',
      position: 'tr',
      ...(typeof errorFromAction === 'function' ? errorFromAction(action) : errorFromAction),
    };
  } else {
    const isFormHanldeValidationErrors = get(action, 'meta.previousAction.payload.form') && status === 422;
    if (errorFromAction === false || isFormHanldeValidationErrors) {
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
    intl: {
      client: intl,
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

          const url = req.url || '';
          if (url.match('auth/login') || url.match('/auth/refresh') || url.match('/auth/update-password')) {
            req.data.device = getUuid();
          }
          if (url.match('auth/activate')) {
            req.params.device = getUuid();
          }

          return req;
        },
        ({ getState, dispatch, getSourceAction }: IStoreInfo, req: AxiosRequestConfig) => {
          if (get(req, ['headers', 'Content-Type']) === 'multipart/form-data') {
            req.data = objectToFormData(req.data);
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
      if (status >= 200 && status < 400) {
        const showSuccess = getSuccess(action);
        if (showSuccess) {
          dispatch(show(showSuccess, showSuccess.level));
        }
      } else {
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
          if (formName && status === 422) {
            dispatch(stopAsyncValidation(formName, parseFormErrorsFromResponse(action)));
          }
          const showError = getError(action, status);
          if (showError) {
            dispatch(show(showError, showError.level));
          }
        }
      }
    },
    returnRejectedPromiseOnError: true,
  }
);
