import get from 'lodash/get';
import { Dispatch } from 'redux';

import { showError, showSuccess } from '#/@store/notifications';

import { registerPost } from '../actions';
import { loginProcess } from './loginProcess';

import { INotification } from '@types';
import getMailClientLinkByEmail from '@utils/getMailClientLinkByEmail';
import openUrlInNewTab from '@utils/openUrlInNewTab';

export const authWithPassword = async (
  data: { email: string; password: string },
  dispatch: Dispatch<any>,
  { isLogin }
) => {
  if (isLogin) {
    await loginProcess({ ...data, isLogin })(dispatch);
  } else {
    try {
      await dispatch(registerPost(data));

      const messageObj: INotification = {
        message: 'Активируйте аккаунт, по ссылке в письме',
        title: 'Регистрация прошла успешно',
      };
      const email = get(data, 'email');
      const url = email && getMailClientLinkByEmail(email);
      if (url) {
        messageObj.action = {
          callback: () => openUrlInNewTab(url),
          label: 'Перейти в почту',
        };
      }
      dispatch(showSuccess(messageObj));
    } catch (e) {
      const statusError = get(e, 'error.response.status');

      if (statusError === 422) {
        return;
      }

      dispatch(showError({ message: e.toString() }));
    }
  }
};
