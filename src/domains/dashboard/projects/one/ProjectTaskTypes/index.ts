import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { projectTaskTypes } from 'src/store/projects';
import { getAllTaskTypes, getTaskTypeById } from 'src/store/task-types';
import { ProjectTaskTypesJsx } from './ProjectTaskTypes';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getTaskTypeById,
  projectTaskTypes,
});

const mapDispatch = {
  closeDialog,
  getAllTaskTypes,
  goToPage: push,
  openDialog,
};

const mergeProps = (state: any, { goToPage, ...restDispatch }: any, { match, ...restOwn }: any) => ({
  ...state,
  ...restDispatch,
  goToProject: (id: number) => goToPage(`${match.url}/${id}`),
  ...restOwn,
});

export const ProjectTaskTypes = connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectTaskTypesJsx));
