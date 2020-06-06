import { Dispatch } from 'redux';
import { getFormValues } from 'redux-form';

import { showError, showWarning } from '#/@store/notifications';

import { updatePasswordAct } from '../actions';
import { LOGIN_FORM_NAME } from '../consts';

import { INotification } from '@types';
import getMailClientLinkByEmail from '@utils/getMailClientLinkByEmail';
import openUrlInNewTab from '@utils/openUrlInNewTab';

export const updatePassword = () => async (dispatch: Dispatch, getState) => {
  const formValues: any = getFormValues(LOGIN_FORM_NAME)(getState());
  try {
    await dispatch(updatePasswordAct(formValues));
    const url = formValues.email && getMailClientLinkByEmail(formValues.email);
    const messageObj: INotification = {
      message: 'Письмо с подтверждением пароля отправлено!',
    };
    if (url) {
      messageObj.action = {
        callback: () => openUrlInNewTab(url),
        label: 'Перейти в почту',
      };
    }
    dispatch(showWarning(messageObj));
  } catch (e) {
    dispatch(showError({ message: 'Неизвестная ошибка' }));
    console.log(e);
  }
};
