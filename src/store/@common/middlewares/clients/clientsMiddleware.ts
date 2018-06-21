import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';

import { userToken } from 'src/store/user';
import { api } from './api';

export interface IStoreInfo {
  getState: () => any;
  dispatch: (fn: any) => any;
  getSourceAction: () => any;
}

export default multiClientMiddleware(
  {
    default: {
      client: api,
    },
  },
  {
    interceptors: {
      request: [
        ({ getState, dispatch, getSourceAction }: IStoreInfo, req: AxiosRequestConfig) => {
          const token = userToken(getState());
          if (token) {
            req.headers.Authorization = 'Bearer ' + token;
          }

          return req;
        },
      ],
      response: [
        ({ getState, dispatch, getSourceAction }: IStoreInfo, res: AxiosResponse) => {
          // console.log('Response', {
          //   store,
          //   response,
          // })
          // const freshToken = response.headers.authorization
          //   ? response.headers.authorization
          //   : false
          // if (freshToken) {
          //   store.dispatch(refreshToken(freshToken))
          // }
          return res;
        },
      ],
    },
    returnRejectedPromiseOnError: true,
  },
);
