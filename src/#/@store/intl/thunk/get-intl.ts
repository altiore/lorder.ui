import { updateIntl } from 'react-intl-redux';

import { getIntl as getIntlAction } from '../actions';

import { getUserLanguage, LOCALE } from '@utils/detectUserLanguage';

export const getIntl = () => async dispatch => {
  const locale = getUserLanguage();
  if (locale === LOCALE.RU) {
    await import('moment/locale/ru');
  }
  const translation = await dispatch(getIntlAction(locale));
  const messages = translation.payload.data;
  await dispatch(updateIntl({ locale, messages }));
};
