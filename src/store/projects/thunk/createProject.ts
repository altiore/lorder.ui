import { error, success } from 'react-notification-system-redux';
import { Dispatch } from 'redux';
import { SubmissionError } from 'redux-form';

import { IPostProjectData, postProject } from '../actions';

export const createProject = async (values: IPostProjectData, dispatch: Dispatch) => {
  try {
    const res = await dispatch(postProject(values));
    dispatch(success({
      message: 'Добавьте варианты задач для проекта, чтобы продолжить',
      position: 'tr',
      title: 'Новый проект успешно создан!',
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