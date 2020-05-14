import { updateIntl } from 'react-intl-redux';

import { getIntl as getIntlAction } from '../actions';

export const getIntl = (locale: string) => async dispatch => {
  const translation = await dispatch(getIntlAction(locale));
  const messages = translation.payload.data;
  await dispatch(updateIntl({ locale, messages }));
};
