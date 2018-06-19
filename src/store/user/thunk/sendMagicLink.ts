import { error, success } from 'react-notification-system-redux';
import { Dispatch } from 'redux';
import { SubmissionError } from 'redux-form';

import { IPostAuthMagicData, postAuthMagic } from '../actions';

export const sendMagicLink = async (values: IPostAuthMagicData, dispatch: Dispatch) => {
  try {
    const res = await dispatch(postAuthMagic(values));
    dispatch(success({
      message: 'Проверьте email, чтоб продолжить работу',
      position: 'tr',
      title: 'Ссылка отправлена!',
    }));
    return res;
  } catch (e) {
    dispatch(error({
      message: e.error.response.data.message,
      position: 'tr',
      title: e.error.response.data.message,
    }));
    throw new SubmissionError(e.error.response.data.errors.reduce((res: {}, current: {property: string, constraints: any}) => {
      res[current.property] = (Object as any).values(current.constraints).join(', ');
      return res;
    }, {}));
  }
};