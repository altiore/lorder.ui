import { push } from 'connected-react-router';
import get from 'lodash/get';
import { Dispatch } from 'redux';

import { showError, showWarning } from '#/@store/notifications';

import { logInPatch } from '../actions';
import { loadInitialData } from './loadInitialData';

import { INotification } from '@types';
import getMailClientLinkByEmail from '@utils/getMailClientLinkByEmail';
import openUrlInNewTab from '@utils/openUrlInNewTab';

const savePasswordToBrowser = () => {
  // Сохранение только что введенного пароля. (Не работает на iOS)
  // if ((window as any).PasswordCredential && 'navigator' in window) {
  //   const cred = new (window as any).PasswordCredential({
  //     id: data.email,
  //     name: data.email,
  //     password: data.password,
  //   });
  //   await (navigator as any).credentials.store(cred);
  // }
};

let wrongCount = 0;

export const loginProcess = (data: { email: string; password: string; isLogin: boolean }) => async (
  dispatch: Dispatch
) => {
  try {
    await dispatch(logInPatch({ email: data.email, password: data.password }));
    dispatch(push('/'));
    await dispatch(loadInitialData() as any);
    savePasswordToBrowser();
  } catch (e) {
    const statusError = get(e, 'error.response.status');

    if (statusError === 422) {
      // TODO: в случае если пароль неверен, предлагать пользователю обновить пароль
      wrongCount++;
      if (wrongCount >= 2) {
        throw new Error(`Вы ввели ${wrongCount} раза неверный пароль`);
      }
      return false;
    }

    if (statusError === 406) {
      const message = get(e, ['error', 'response', 'data', 'message'], 'Ошибка логина или пароля');
      const messageObj: INotification = {
        message,
        title: 'Что-то пошло не так',
      };
      const email = get(e, ['meta', 'previousAction', 'payload', 'request', 'data', 'email']);
      const url = email && getMailClientLinkByEmail(email);
      if (url) {
        messageObj.action = {
          callback: () => openUrlInNewTab(url),
          label: 'Перейти в почту',
        };
      }
      dispatch(showWarning(messageObj));
      return;
    }

    dispatch(showError({ message: e?.error?.response?.data?.message || 'Неизвестная ошибка авторизации' }));
  }
};
