import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeTasksFilter, tasksFilter } from 'store/tasksFilter';
import { FilterTsx } from './Filter';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filter: tasksFilter,
});

const mapDispatch = {
  changeTasksFilter,
};

export const Filter = connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(FilterTsx));
