import React, { useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import YouTubeVideo from '@components/YouTubeVideo';

import HiHeader from '#/#hi/HiHeader';
import ScreenAdvantages from './ScreenAdvantages';
import ScreenHelp from './ScreenHelp';
import ScreenProgress from './ScreenProgress';
import ScreenServices from './ScreenServices';
import ScreenStart from './ScreenStart';
import ScreenSupport from '#/@common/ScreenSupport';
import ScreenTeam from './ScreenTeam';

export interface IHiProps {
  brandName: string;
  classes: any;
  fetchAltiore: () => any;
  fetchStatistics: () => any;
  height: number;
  scrollWidth: number;
  width: number;
}

const BLOCKS = {
  start: {
    menu: true,
    name: 'start',
    title: 'Начать',
  },

  help: {
    menu: true,
    name: 'help',
    title: 'Что это?',
  },

  services: {
    name: 'services',
    title: 'Услуги',
  },

  advantages: {
    name: 'advantages',
    title: 'Преимущества',
  },

  progress: {
    name: 'progress',
    title: 'Достижения',
  },

  team: {
    menu: true,
    name: 'team',
    title: 'Наша Команда',
  },

  support: {
    menu: true,
    name: 'support',
    title: 'Поддержать проект',
  },
};

export const HiTsx: React.FC<IHiProps> = ({
  brandName,
  classes,
  fetchAltiore,
  fetchStatistics,
  height,
  scrollWidth,
  width,
}) => {
  useEffect(() => {
    fetchStatistics();
    fetchAltiore();
  }, [fetchAltiore, fetchStatistics]);

  const theme = useTheme();
  const isDesctop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {isDesctop ? (
        <YouTubeVideo
          videoId="PT8urv0CtUw"
          opts={{ start: 14, end: 280 }}
          height={height}
          scrollWidth={scrollWidth}
          width={width}
        />
      ) : null}

      <HiHeader blocks={BLOCKS} />

      <ScreenStart name={BLOCKS.start.name} />

      <ScreenHelp name={BLOCKS.help.name} />

      <ScreenServices name={BLOCKS.services.name} />

      <ScreenAdvantages name={BLOCKS.advantages.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenTeam name={BLOCKS.team.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenSupport name={BLOCKS.support.name} />
    </>
  );
};
