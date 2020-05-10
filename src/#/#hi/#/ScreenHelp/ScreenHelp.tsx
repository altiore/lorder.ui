import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ClipboardIcon from '@components/@icons/Clipboard';
import CollaborationIcon from '@components/@icons/Collaboration';
import MagnifierIcon from '@components/@icons/Magnifier';
import NetworkingIcon from '@components/@icons/Networking';
import StatisticsIcon from '@components/@icons/Statistics';
import TimeIcon from '@components/@icons/Time';

import Block from '#/#hi/#/@common/Block';
import BlockContent from '#/#hi/#/@common/BlockContent';
import ScreenTitle from '#/#hi/#/@common/ScreenTitle';
import SubTitle from '#/#hi/#/@common/SubTitle';

import HoveredItem from './HoveredItem';
import { useStyles } from './styles';

interface ScreenHelpI {
  name: string;
}

const INFO_LIST = [
  {
    description: 'Регистрация времени еще никогда не была столь приятным занятием. Все работает автоматически!',
    icon: <TimeIcon fontSize="large" />,
    title: 'Регистрация времени, потраченного на задачу',
  },
  {
    description:
      'Не так-то просто сопоставить работу разных людей. Кто отработал меньше, а кто больше - как понять? Эту непростую задачу мастерски решает наш сервис',
    icon: <CollaborationIcon fontSize="large" />,
    title: 'Совместная работа над проектом',
  },
  {
    description:
      'Сервис напомнит о важной задаче вовремя, а лишние будут завершены автоматически. Да, так тоже можно было...',
    icon: <ClipboardIcon fontSize="large" />,
    title: 'Удобное управление задачами в проекте',
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
    title: 'Справедливое распределение результатов труда между членами команды',
  },
  {
    description:
      'Нет ничего лучше, чем посмотреть на проделанное за последний год. Объёмы ошеломляют. Результат работы вдохновляет',
    icon: <StatisticsIcon fontSize="large" />,
    title: 'Статистика',
  },
];

const ScreenHelp: React.FC<ScreenHelpI> = ({ name }) => {
  const classes = useStyles();

  return (
    <Block name={name} alignItems="flex-start" className={classes.content}>
      <ScreenTitle black>Мы поможем</ScreenTitle>
      <SubTitle black>
        <Typography variant="subtitle1">
          <b>WEB</b> сервис для регистрации потраченного на работу времени
        </Typography>
        <Typography variant="subtitle1">Управление задачами IT проекта</Typography>
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
