import React from 'react';

import HiHeader from '#/#hi/HiHeader';
import ScreenSupport from '#/@common/ScreenSupport';

const BLOCKS = {
  start: {
    menu: false,
    name: 'start',
    title: 'Начать'
  }
}

export const Support: React.FC = () => {
  return (
    <>
      <HiHeader blocks={BLOCKS} />
      <ScreenSupport name='support' />
    </>
  );
};
