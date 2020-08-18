import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { Container, MenuItem, Select } from '@material-ui/core';

import ProjectCard, { CARD_COLOR, LOGO_TYPE } from '@components/project-card';

import { VALUE_MULTIPLIER } from '#/@store/projects';
import { ROUTE } from '#/@store/router';

import { useStyles } from './styles';

import { IProjectPub } from '@types';
import getRandEnum from '@utils/get-rand-enum';

interface IProps {
  fetchProjectsPubAct: any;
  projectPubList: IProjectPub[];
}

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

export const ProjectsList: React.FC<IProps> = ({ fetchProjectsPubAct, projectPubList }) => {
  useEffect(() => {
    fetchProjectsPubAct();
  }, [fetchProjectsPubAct]);

  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.value);
  const handleSortChange = useCallback(
    (evt: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      setFilterType(evt.target.value as FILTER_TYPE);
    },
    [setFilterType]
  );

  const sortedProjectPubList = useMemo(() => {
    if (projectPubList && projectPubList.length) {
      return sortBy(projectPubList, sortFunc.bind(undefined, filterType));
    }

    return [];
  }, [filterType, projectPubList]);

  const { cardsWrap } = useStyles();

  if (!sortedProjectPubList.length) {
    return null;
  }

  return (
    <Container>
      <Select value={filterType} style={{ width: 250, marginTop: 30 }} onChange={handleSortChange}>
        {Object.values(FILTER_TYPE).map(filterValue => (
          <MenuItem key={filterValue} value={filterValue}>
            {FILTER_TITLE[filterValue]}
          </MenuItem>
        ))}
      </Select>
      <div className={cardsWrap}>
        {sortedProjectPubList.map(({ project, statistic, title, uuid }) => (
          <ProjectCard
            key={uuid}
            logoSrc={project?.logo?.url}
            color={getRandEnum(CARD_COLOR)}
            logoVariant={getRandEnum(LOGO_TYPE)}
            membersCount={statistic.metrics?.all.membersCount || 0}
            projectLink={ROUTE.PUBLIC.ONE(uuid)}
            title={title}
            value={VALUE_MULTIPLIER * (statistic.metrics?.all.value || 0)}
          />
        ))}
      </div>
    </Container>
  );
};
