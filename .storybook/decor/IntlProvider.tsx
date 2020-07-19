import React from 'react';
import { IntlProvider } from 'react-intl';

export default (getStory: any) => {
  return <IntlProvider locale="ru-RU">{getStory()}</IntlProvider>;
};
