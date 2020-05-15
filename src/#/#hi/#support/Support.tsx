import React from 'react';

import HiHeader from '#/#hi/@common/HiHeader';
import ScreenSupport from '#/#hi/@common/ScreenSupport';

const BLOCKS = {
  start: {
    menu: false,
    name: 'start',
    title: 'Начать',
  },
};

export const Support: React.FC = () => {
  return (
    <>
      <HiHeader blocks={BLOCKS} />
      <ScreenSupport name="support" />
    </>
  );
};
