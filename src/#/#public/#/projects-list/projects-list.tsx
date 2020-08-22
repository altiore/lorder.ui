import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { CircularProgress, Container, MenuItem, Select } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import T from '@material-ui/core/Typography';

import ProjectCard, { CARD_COLOR, LOGO_TYPE } from '@components/project-card';
import Slider from '@components/slider';

import { VALUE_MULTIPLIER } from '#/@store/projects';
import { ROUTE } from '#/@store/router';

import { IProjectPub } from '@types';
import getRandEnum from '@utils/get-rand-enum';

enum FILTER_TYPE {
  membersCount = 'statistic.metrics.all.membersCount',
  value = 'statistic.metrics.all.value',
}

const FILTER_TITLE = {
  [FILTER_TYPE.membersCount]: 'Массовые сначала',
  [FILTER_TYPE.value]: 'Ценные сначала',
};

const sortFunc = (filterType, o) => {
  return -get(o, filterType);
};

interface IProps {
  filteredList: IProjectPub[];
  isLoading: boolean;
}

export const ProjectsList: React.FC<IProps> = ({ filteredList, isLoading }) => {
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.value);
  const handleSortChange = useCallback(
    (evt: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      setFilterType(evt.target.value as FILTER_TYPE);
    },
    [setFilterType]
  );

  const sortedProjectPubList = useMemo(() => {
    if (filteredList && filteredList.length) {
      return sortBy(filteredList, sortFunc.bind(undefined, filterType));
    }

    return [];
  }, [filterType, filteredList]);

  const { cardsWrap, notFound, selectStyle } = useStyles();

  return (
    <Container>
      <Select value={filterType} className={selectStyle} onChange={handleSortChange}>
        {Object.values(FILTER_TYPE).map(filterValue => (
          <MenuItem key={filterValue} value={filterValue}>
            {FILTER_TITLE[filterValue]}
          </MenuItem>
        ))}
      </Select>
      {Boolean(sortedProjectPubList.length) ? (
        <Slider className={cardsWrap}>
          {sortedProjectPubList.map(({ project, statistic, title, uuid }) => (
            <ProjectCard
              key={uuid}
              logoSrc={project?.logo?.url}
              color={getRandEnum(CARD_COLOR)}
              logoVariant={getRandEnum(LOGO_TYPE)}
              membersCount={statistic.metrics?.all?.membersCount || 0}
              projectLink={ROUTE.PUBLIC.ONE(uuid)}
              title={title}
              value={VALUE_MULTIPLIER * (statistic.metrics?.all?.value || 0)}
            />
          ))}
        </Slider>
      ) : (
        <div className={notFound}>
          {isLoading ? (
            <CircularProgress size={200} color="primary" />
          ) : (
            <T variant="h4">Проектов, соответсвующих вашему запросу, не было найдено</T>
          )}
        </div>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  cardsWrap: {
    '& > div': {
      margin: '15px 0',
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 40,
  },
  notFound: {
    '& > *': {
      textAlign: 'center',
    },
    alignItems: 'center',
    display: 'flex',
    height: 232,
    justifyContent: 'center',
  },
  selectStyle: {
    marginTop: 32,
    width: 250,
  },
}));
