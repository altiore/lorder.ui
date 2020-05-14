import { requestActions } from '#/@store/@common/requestActions';

export const getIntl = requestActions<string>('INTL/GET_TRANSLATION', (locale: string) => ({
  client: 'intl',
  request: {
    url: `/i18n/${locale}.json`,
  },
}));
