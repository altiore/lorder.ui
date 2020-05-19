import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import get from 'lodash-es/get';

import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grow from '@material-ui/core/Grow';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DoneIcon from '@material-ui/icons/Done';

import { TASK_FILTER_TYPE } from '#/@store/tasksFilter/TasksFilter';

export interface IFilterProps {
  changeTasksFilter: any;
  changePage: any;
  classes?: any;
  count: number;
  filter: TASK_FILTER_TYPE;
  page: number;
  perPage: number;
}

export interface IFilterState {
  hoveredFilter?: string;
  isFilterHovered: boolean;
  isPaginatorHovered: boolean;
}

const FILTERS: { [key in TASK_FILTER_TYPE]: string } = {
  [TASK_FILTER_TYPE.SMART]: 'Ценные',
  [TASK_FILTER_TYPE.RECENT]: 'Недавние',
  [TASK_FILTER_TYPE.NEW]: 'Новые',
};
const getLabelFromFilter = (filter: TASK_FILTER_TYPE) => FILTERS[filter];

export const FilterTsx: React.FC<IFilterProps> = ({
  classes,
  changeTasksFilter,
  page,
  count,
  perPage,
  changePage,
  filter,
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

  const [isPaginatorHovered, setIsPaginatorHovered] = useState(false);
  const handlePaginatorEnter = useCallback(() => setIsPaginatorHovered(true), []);
  const handlePaginatorLeave = useCallback(() => setIsPaginatorHovered(false), []);

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

  return (
    <ListItem className={classes.root}>
      <div
        className={classes.pagination}
        onMouseEnter={handlePaginatorEnter}
        onMouseLeave={handlePaginatorLeave}
        onFocus={handlePaginatorEnter}
        onBlur={handlePaginatorLeave}
      >
        <Grow in={isPaginatorHovered} timeout={600}>
          <Fab
            size="small"
            color="secondary"
            onClick={changePage(page - 1)}
            className={cn(classes.left, classes.fabStyle)}
          >
            <ChevronLeftIcon />
          </Fab>
        </Grow>
        {page + 1} из {Math.ceil(count / perPage)}
        <Grow in={isPaginatorHovered} timeout={600}>
          <Fab
            size="small"
            color="secondary"
            onClick={changePage(page + 1)}
            className={cn(classes.right, classes.fabStyle)}
          >
            <ChevronRightIcon />
          </Fab>
        </Grow>
      </div>
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
