import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DoneIcon from '@material-ui/icons/Done';
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

const FILTERS = { smart: 'Ценные', recent: 'Недавние', new: 'Новые' };
const getLabelFromFilter = (filter: 'smart' | 'recent' | 'new') => FILTERS[filter];

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
        <Chip
          label={getLabelFromFilter(filter)}
          clickable
          className={classes.chip}
          color="secondary"
          deleteIcon={<DoneIcon />}
        />
        <RadioGroup
          row
          aria-label="Gender"
          name="filter"
          className={classes.group}
          value={filter}
          onChange={changeTasksFilter}
        >
          {Object.keys(FILTERS).map((f: 'smart' | 'recent' | 'new') => {
            const label = getLabelFromFilter(f);
            return (
              <Tooltip title={label} key={f}>
                <Radio checked={filter === f} value={f} name="task-filter" aria-label={label} />
              </Tooltip>
            );
          })}
        </RadioGroup>
      </div>
    </ListItem>
  )
);
