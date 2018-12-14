import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';

export interface IFilterProps {
  changeTasksFilter: any;
  changePage: any;
  classes?: any;
  count: number;
  filter: 'smart' | 'recent' | 'new';
  page: number;
  perPage: number;
}

export const FilterTsx: React.FunctionComponent<IFilterProps> = React.memo(
  ({ classes, page, count, perPage, changePage, filter, changeTasksFilter }) => (
    <ListItem className={classes.filter}>
      <div>
        <Fab size="small" onClick={changePage(page - 1)} className={classes.left}>
          <ChevronLeftIcon />
        </Fab>
        {page + 1}/{Math.ceil(count / perPage)}
        <Fab size="small" onClick={changePage(page + 1)} className={classes.right}>
          <ChevronRightIcon />
        </Fab>
      </div>
      <div className={classes.grow} />
      <div>
        <RadioGroup
          row
          aria-label="Gender"
          name="filter"
          className={classes.group}
          value={filter}
          onChange={changeTasksFilter}
        >
          <Tooltip title={'Ценные'}>
            <Radio checked={filter === 'smart'} value="smart" name="task-filter" aria-label="smart" />
          </Tooltip>
          <Tooltip title={'Недавние'}>
            <Radio checked={filter === 'recent'} value="recent" name="task-filter" aria-label="recent" />
          </Tooltip>
          <Tooltip title={'Новые'}>
            <Radio checked={filter === 'new'} value="new" name="task-filter" aria-label="new" />
          </Tooltip>
        </RadioGroup>
      </div>
    </ListItem>
  )
);
