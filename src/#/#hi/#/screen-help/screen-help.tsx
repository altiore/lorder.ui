import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ClipboardIcon from '@components/@icons/Clipboard';
import CollaborationIcon from '@components/@icons/Collaboration';
import MagnifierIcon from '@components/@icons/Magnifier';
import NetworkingIcon from '@components/@icons/Networking';
import StatisticsIcon from '@components/@icons/Statistics';
import TimeIcon from '@components/@icons/Time';

import Block from '#/#hi/#/@common/block';
import BlockContent from '#/#hi/#/@common/block-content';
import ScreenTitle from '#/#hi/#/@common/screen-title';
import SubTitle from '#/#hi/#/@common/sub-title';

import HoveredItem from './hovered-item';
import { useStyles } from './styles';

interface ScreenHelpI {
  name: string;
}

const INFO_LIST = [
  {
    description: 'Мы превратили учёт времени в увлекательную игру. Все, что неинтересно, работает автоматически!',
    icon: <TimeIcon fontSize="large" />,
    title: 'Учёт времени, затраченного на задачу',
  },
  {
    description:
      'Не так-то просто сравнить труд разных людей. Кто внес больший вклад, а кто меньший - как понять? Эту непростую задачу решает Lorder',
    icon: <CollaborationIcon fontSize="large" />,
    title: 'Совместный труд над проектом',
  },
  {
    description: 'Несколько режимов перемещения задач по процессу позволяют эффективно развивать проект',
    icon: <ClipboardIcon fontSize="large" />,
    title: 'Управление задачами в проекте',
  },
  {
    description: 'Иногда приятно понаблюдать, как лихо партнёры справляются со своими задачами',
    icon: <MagnifierIcon fontSize="large" />,
    title: 'Отслеживание хода выполнения задач в проекте',
  },
  {
    description:
      'Вы знали, что с математической точки зрения, справедливое распределение ресурсов в команде - это решаемая задача? По крайней мере, для небольшого количества участников...',
    icon: <NetworkingIcon fontSize="large" />,
    title: 'Справедливое распределение результатов труда среди участников команды',
  },
  {
    description:
      'Нет ничего лучше, чем посмотреть на проделанное за последний год. Объёмы ошеломляют. Результат труда вдохновляет',
    icon: <StatisticsIcon fontSize="large" />,
    title: 'Статистика',
  },
];

const ScreenHelp: React.FC<ScreenHelpI> = ({ name }) => {
  const classes = useStyles();

  return (
    <Block name={name} alignItems="flex-start" className={classes.content}>
      <ScreenTitle black>WEB сервис</ScreenTitle>
      <SubTitle black>
        <Typography variant="subtitle1">для учёта затраченного времени,</Typography>
        <Typography variant="subtitle1">управления задачами проектов,</Typography>
        <Typography variant="subtitle1">распределения ценности</Typography>
      </SubTitle>
      <BlockContent className={classes.hoveredItems}>
        <Grid container spacing={4}>
          {INFO_LIST.map((data, index) => (
            <HoveredItem key={index} index={index} {...data} />
          ))}
        </Grid>
      </BlockContent>
    </Block>
  );
};

export default ScreenHelp;
