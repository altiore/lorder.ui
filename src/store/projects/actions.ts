import { requestActions } from 'src/store/@common/requestActions';

export interface IPostProjectData {
  monthlyBudget?: string | number;
  title: string;
}

export const postProject = requestActions<IPostProjectData>('PROJECTS/POST', ({ monthlyBudget, title }: IPostProjectData) => ({
  request: {
    data: {
      monthlyBudget: monthlyBudget && parseInt(monthlyBudget as string, 0),
      title,
    },
    method: 'POST',
    url: '/projects',
  },
}));

export * from './thunk'