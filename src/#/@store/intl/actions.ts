import { createApiAction } from 'redux-actions-api';

export const getIntl = createApiAction<string>('INTL/GET_TRANSLATION', (locale: string) => ({
  client: 'intl',
  request: {
    url: `/i18n/${locale}.json`,
  },
}));
