import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import get from 'lodash-es/get';

import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoneIcon from '@material-ui/icons/Done';

import ProjectSelect from '@components/ProjectSelect';

import { TASK_FILTER_TYPE } from '#/@store/tasksFilter/TasksFilter';

import { IProject } from '../../../../../@types';
import { ProjectFieldJsx } from '../../../Header/ProjectField/ProjectField';

export interface IFilterProps {
  changeTasksFilter: any;
  changeFilter: any;
  changePage: any;
  classes?: any;
  count: number;
  filter: TASK_FILTER_TYPE;
  projectId: number;
  projects: IProject[];
  getValue: (value: any) => any;
  getLabel: (label: any) => any;
  page: number;
  perPage: number;
  searchTerm: string;
}

const FILTERS: { [key in TASK_FILTER_TYPE]: string } = {
  [TASK_FILTER_TYPE.SMART]: 'Ценные',
  [TASK_FILTER_TYPE.RECENT]: 'Недавние',
  [TASK_FILTER_TYPE.NEW]: 'Новые',
};
const getLabelFromFilter = (filter: TASK_FILTER_TYPE) => FILTERS[filter];

ProjectFieldJsx.defaultProps = {
  getLabel: (item: any) => item.title,
  getValue: (item: any) => item.id,
  items: [],
};

export const FilterTsx: React.FC<IFilterProps> = ({
  classes,
  changeTasksFilter,
  changeFilter,
  searchTerm,
  page,
  count,
  perPage,
  changePage,
  filter,
  projectId,
  projects,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [hoveredFilter, setHoveredFilter] = useState();
  const handleRadioEnter = useCallback((e: React.SyntheticEvent) => {
    setHoveredFilter(get(e, 'target.value'));
  }, []);
  const handleRadioLeave = useCallback(() => setHoveredFilter(undefined), []);

  const [isFilterHovered, setIsFilterHovered] = useState(false);
  const toggleFilterHovered = useCallback(() => {
    setIsFilterHovered(state => !state);
  }, []);
  const handleSetHovered = useCallback(() => setIsFilterHovered(true), []);
  const handleSetNotHovered = useCallback(() => setIsFilterHovered(false), []);

  const isFilterShown = useMemo(() => isMobile || isFilterHovered, [isMobile, isFilterHovered]);

  const currentSelectedFilter = useMemo(() => {
    return FILTERS[hoveredFilter || filter];
  }, [hoveredFilter, filter]);

  const handleChangeTaskFilter = useCallback(
    (e: React.ChangeEvent<any>) => {
      const newFilter = get(e, ['target', 'value']);
      changeTasksFilter(newFilter);
    },
    [changeTasksFilter]
  );

  const filterProject = useCallback(
    (value: number) => {
      changeFilter('projectId', value);
    },
    [changeFilter]
  );

  const filterTask = useCallback(
    (e: React.ChangeEvent<{ value: any }>) => {
      changeFilter('search', e.target.value);
    },
    [changeFilter]
  );

  return (
    <ListItem className={classes.root}>
      <div className={classes.projectSelect}>
        <ProjectSelect onChange={filterProject} projects={projects} projectId={projectId} />
      </div>
      <InputBase
        className={classes.input}
        placeholder="Выберите или создайте задачу..."
        value={searchTerm}
        onChange={filterTask}
      />
      <div className={classes.grow} />
      <div className={classes.filter} onMouseEnter={handleSetHovered} onMouseLeave={handleSetNotHovered}>
        <Chip
          label={currentSelectedFilter}
          clickable
          className={cn(classes.chip, { [classes.chipHovered]: isFilterHovered })}
          variant="outlined"
          deleteIcon={<DoneIcon />}
          onClick={toggleFilterHovered}
          style={{ bottom: isFilterShown ? 40 : 16 }}
          onFocus={handleSetHovered}
          onBlur={handleSetNotHovered}
        />
        {isFilterShown && (
          <Grow in={isFilterShown} timeout={500}>
            <RadioGroup
              row
              aria-label="Gender"
              name="filter"
              className={classes.group}
              value={filter}
              onChange={handleChangeTaskFilter}
            >
              {Object.keys(FILTERS).map((f: any) => {
                const label = getLabelFromFilter(f);
                return (
                  <Radio
                    key={f}
                    color="primary"
                    checked={filter === f}
                    value={f}
                    name="task-filter"
                    aria-label={label}
                    onMouseEnter={handleRadioEnter}
                    onMouseLeave={handleRadioLeave}
                  />
                );
              })}
            </RadioGroup>
          </Grow>
        )}
      </div>
    </ListItem>
  );
};
