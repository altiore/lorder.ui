import { requestActions } from 'src/store/@common/requestActions';

export const fetchPublicProject = requestActions<string>('PUBLIC_PROJECT/FETCH_ONE', (projectId: string) => ({
  request: {
    url: `/public/${projectId}`,
  },
}));
