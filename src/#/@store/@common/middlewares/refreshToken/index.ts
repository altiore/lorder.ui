import moment from 'moment';

import { store } from '#/@store/createStore';
import { isAuth, refreshToken, userExpiresIn, userIsRefreshing, userRefreshToken } from '#/@store/identity';

import { SESSION_BEARER_KEY_FIELD } from '../clients/clientsMiddleware';

const isShouldCheck = action => {
  return (
    action &&
    action.payload &&
    action.payload.request &&
    [undefined, 'api'].includes(action.payload.client) &&
    !action.payload.noAuth
  );
};

const isShouldRefresh = (getState): false | string => {
  const state = getState();
  const curIsAuth = isAuth(state);
  const currentToken = userRefreshToken(state);
  const expiresIn = userExpiresIn(state);
  const expiresDate = moment.unix(expiresIn || 0);
  const diffInSeconds = expiresDate.diff(moment(), 'seconds');

  const maximumAllowedDiffInSeconds = process.env.REACT_APP_REFRESH_BEFOR
    ? parseInt(process.env.REACT_APP_REFRESH_BEFOR, 10)
    : 180;

  const bearerKey = window.sessionStorage.getItem(SESSION_BEARER_KEY_FIELD);
  const isShould = curIsAuth && currentToken && (diffInSeconds < maximumAllowedDiffInSeconds || !bearerKey);
  if (isShould) {
    return currentToken as string;
  }

  return false;
};

export const refreshTokenMiddleware = ({ getState, dispatch }) => {
  return (next: any) => {
    return async (action: any) => {
      if (isShouldCheck(action)) {
        const isRefreshing = userIsRefreshing(getState());

        if (isRefreshing) {
          setTimeout(() => dispatch(action), 1000);

          return Promise.resolve();
        } else {
          const curToken = isShouldRefresh(getState);
          if (curToken) {
            try {
              await dispatch(refreshToken(curToken));
            } catch (err) {
              await store.persistor.purge();
              return await Promise.reject();
            }
          }
        }
      }

      return next(action);
    };
  };
};
