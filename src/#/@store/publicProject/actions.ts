import { requestActions } from '#/@store/@common/requestActions';

export const fetchPublicProject = requestActions<string>('PUBLIC_PROJECT/FETCH_ONE', (projectId: string) => ({
  request: {
    url: `/public/${projectId}`,
  },
}));
