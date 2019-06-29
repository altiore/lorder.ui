import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AssignmentIco from '@material-ui/icons/Assignment';
import HistoryIco from '@material-ui/icons/History';
import LocationSearchingIco from '@material-ui/icons/LocationSearching';
import PeopleOutlineIco from '@material-ui/icons/PeopleOutline';
import SwapCallsIco from '@material-ui/icons/SwapCalls';
import TimelineIco from '@material-ui/icons/Timeline';
import React from 'react';

import Block from "@domains/@Hi/@common/Block";
import BlockContent from "@domains/@Hi/@common/BlockContent";
import ScreenTitle from "@domains/@Hi/@common/ScreenTitle";
import SubTitle from "@domains/@Hi/@common/SubTitle";
import HoveredItem from "./HoveredItem";
import {useStyles} from "./styles";

interface Screen1I {
  services?: any[];
}

const Screen2: React.FC<Screen1I> = ({services}) => {
  const classes = useStyles();

  return (
    <Block alignItems="flex-start" className={classes.content}>
      <ScreenTitle black>
        Мы поможем
      </ScreenTitle>
      <SubTitle black>
        <Typography noWrap variant='subtitle2'>
          WEB сервис для регистрации потраченного на работу времени.
        </Typography>
        <Typography noWrap variant='subtitle2'>
          Управление задачами IT проекта
        </Typography>
      </SubTitle>
      <BlockContent className={classes.hoveredItems}>
        <Grid container spacing={4  }>
          <HoveredItem
            description="Регистрация времени еще никогда не была таким приятным занятием. Все работает автоматически"
            icon={<HistoryIco fontSize="large" />}
            title="Регистрация времени, потраченного на задачу"
          />
          <HoveredItem
            description="Не так-то просто сопоставить работу разных людей. Кто отработал меньше, а кто больше - как понять? Эту непростую задачу мастерски решает наш сервис"
            icon={<PeopleOutlineIco fontSize="large" />}
            title="Совместная работа над проектом"
          />
          <HoveredItem
            description="Сервис не позволит вам забрасывать задачи. А лишние он завершит сам. Да, так тоже можно"
            icon={<AssignmentIco fontSize="large" />}
            title="Удобное управление задачами в проекте"
          />
          <HoveredItem
            description="Иногда приятно понаблюдать, как лихо партнеры справляются со своими задачми"
            icon={<LocationSearchingIco fontSize="large" />}
            title="Отслеживание хода выполнения задач в проекте"
          />
          <HoveredItem
            description="Вы знали, что с математическо точки зрения справедливое распределение ресурсов в команде - это решаемая задача? По крайней мере, для небольшого количества участников..."
            icon={<SwapCallsIco fontSize="large" />}
            title="Справедливое распределение результатов работы между членами команды"
          />
          <HoveredItem
            description="Нет ничего лучше, чем посмотреть на проделанное за последний год. Объемы ошеломляют. Результат работы вдохновляет"
            icon={<TimelineIco fontSize="large" />}
            title="Статистика"
          />
          {/*<HoveredItem*/}
          {/*  description="Увидеть свой вклад в проект так важно. Иногда кажется, что никто в проекте не работает, кроме тебя, но вклад 2% в статистике проекта говорит об обратном"*/}
          {/*  icon={<TimelineIco fontSize="large" />}*/}
          {/*  title="Статистика проекта"*/}
          {/*/>*/}
        </Grid>
      </BlockContent>
    </Block>
  );
};

export default Screen2;