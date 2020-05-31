import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { ownProjectListWithoutDefault } from '#/@store/projects';
import { changeFilter, changeTasksFilter, projectId, searchTerm, tasksFilter } from '#/@store/tasksFilter';

import { FilterTsx } from './Filter';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filter: tasksFilter,
  projectId,
  projects: ownProjectListWithoutDefault,
  searchTerm,
} as any);

const mapDispatch = {
  changeFilter,
  changeTasksFilter,
};

export const Filter = withStyles(styles, { withTheme: true })(
  connect<any, any, any>(
    mapState,
    mapDispatch
  )(FilterTsx as any)
);
