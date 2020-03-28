import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';

export interface IFilterProps {
  classes?: any;
}

export const FilterTsx: React.FunctionComponent<IFilterProps> = React.memo(({ classes }) => (
  <ListItem className={classes.filter}>
    <Tooltip title={'Адаптивно'}>
      <Radio disabled checked={false} value="flex" name="task-filter" aria-label="flex" />
    </Tooltip>
    <Tooltip title={'Недавние'}>
      <Radio checked={true} value="recent" name="task-filter" aria-label="recent" />
    </Tooltip>
    <Tooltip title={'Новые'}>
      <Radio checked={false} value="new" name="task-filter" aria-label="new" />
    </Tooltip>
  </ListItem>
));
