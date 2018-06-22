import { requestActions } from 'src/store/@common/requestActions';

export interface IPostProjectData {
  monthlyBudget?: string | number;
  title: string;
}

export const postProject = requestActions<IPostProjectData>('PROJECTS/POST', ({ monthlyBudget, title }: IPostProjectData) => ({
  error: {
    message: 'Не удалось сохранить проект',
    title: 'Неудача',
  },
  form: 'ProjectForm',
  request: {
    data: {
      monthlyBudget: monthlyBudget && parseInt(monthlyBudget as string, 0),
      title,
    },
    method: 'POST',
    url: '/projects',
  },
  success: {
    message: 'Добавьте варианты задач для проекта, чтобы продолжить',
    title: 'Новый проект успешно создан!',
  },
}));

export const getAllProjects = requestActions('PROJECTS/GET_ALL', () => ({
  request: {
    url: '/projects',
  },
}));
