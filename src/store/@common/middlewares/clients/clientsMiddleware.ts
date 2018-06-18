import { AxiosRequestConfig, AxiosResponse } from 'axios';
// const get = require('lodash/get');
import { multiClientMiddleware } from 'redux-axios-middleware';

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
          const token = getState().user.token;
          if (token) {
            req.headers.Authorization = token;
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
  },
);
