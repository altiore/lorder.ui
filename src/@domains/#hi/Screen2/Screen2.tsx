import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AssignmentIco from '@material-ui/icons/Assignment';
import HistoryIco from '@material-ui/icons/History';
import LocationSearchingIco from '@material-ui/icons/LocationSearching';
import PeopleOutlineIco from '@material-ui/icons/PeopleOutline';
import SwapCallsIco from '@material-ui/icons/SwapCalls';
import TimelineIco from '@material-ui/icons/Timeline';
import React from 'react';

import Block from '@domains/#hi/@common/Block';
import BlockContent from '@domains/#hi/@common/BlockContent';
import ScreenTitle from '@domains/#hi/@common/ScreenTitle';
import SubTitle from '@domains/#hi/@common/SubTitle';
import HoveredItem from './HoveredItem';
import { useStyles } from './styles';

interface Screen1I {
  services?: any[];
}

const INFO_LIST = [
  {
    description: 'Регистрация времени еще никогда не была столь приятным занятием. Все работает автоматически!',
    icon: <HistoryIco fontSize="large" />,
    title: 'Регистрация времени, потраченного на задачу',
  },
  {
    description:
      'Не так-то просто сопоставить работу разных людей. Кто отработал меньше, а кто больше - как понять? Эту непростую задачу мастерски решает наш сервис',
    icon: <PeopleOutlineIco fontSize="large" />,
    title: 'Совместная работа над проектом',
  },
  {
    description:
      'Сервис напомнит о важной задаче вовремя, а лишние будут завершены автоматически. Да, так тоже можно было...',
    icon: <AssignmentIco fontSize="large" />,
    title: 'Удобное управление задачами в проекте',
  },
  {
    description: 'Иногда приятно понаблюдать, как лихо партнёры справляются со своими задачами',
    icon: <LocationSearchingIco fontSize="large" />,
    title: 'Отслеживание хода выполнения задач в проекте',
  },
  {
    description:
      'Вы знали, что с математической точки зрения, справедливое распределение ресурсов в команде - это решаемая задача? По крайней мере, для небольшого количества участников...',
    icon: <SwapCallsIco fontSize="large" />,
    title: 'Справедливое распределение результатов труда между членами команды',
  },
  {
    description:
      'Нет ничего лучше, чем посмотреть на проделанное за последний год. Объёмы ошеломляют. Результат работы вдохновляет',
    icon: <TimelineIco fontSize="large" />,
    title: 'Статистика',
  },
  // {
  //   description: "Увидеть свой вклад в проект так важно. Иногда кажется, что никто в проекте не работает, кроме тебя, но вклад 2% в статистике проекта говорит об обратном",
  //   icon: <TimelineIco fontSize"large"  />,
  //   title: "Статистика проекта",
  // },
];

const Screen2: React.FC<Screen1I> = ({ services }) => {
  const classes = useStyles();

  return (
    <Block alignItems="flex-start" className={classes.content}>
      <ScreenTitle black>Мы поможем</ScreenTitle>
      <SubTitle black>
        <Typography variant="subtitle2">WEB сервис для регистрации потраченного на работу времени.</Typography>
        <Typography variant="subtitle2">Управление задачами IT проекта</Typography>
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

export default Screen2;
