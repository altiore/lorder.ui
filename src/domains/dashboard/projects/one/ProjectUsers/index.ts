import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { projectMembers } from 'src/store/projects';
import { ProjectUsersJsx } from './ProjectUsers';
import { styles } from './styles';

export const ProjectUsers = connect(
  createStructuredSelector({
    projectMembers,
  }),
  {
    closeDialog,
    goToPage: push,
    openDialog,
  },
  (state: any, { goToPage, ...restDispatch }: any, { match, ...restOwn }: any) => ({
    ...state,
    ...restDispatch,
    goToProject: (id: number) => goToPage(`${match.url}/${id}`),
    ...restOwn,
  })
)(withStyles(styles, { withTheme: true })(ProjectUsersJsx));
