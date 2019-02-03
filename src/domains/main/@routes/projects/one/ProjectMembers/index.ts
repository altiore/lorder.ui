import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { deleteProjectMember, projectMembers } from 'src/store/projects';
import { routeProjectId } from 'src/store/router';
import { ProjectMembersJsx } from './ProjectMembers';
import { styles } from './styles';

export const ProjectMembers = connect(
  createStructuredSelector({
    projectId: routeProjectId,
    projectMembers,
  }),
  {
    closeDialog,
    deleteProjectMember,
    goToPage: push,
    openDialog,
  },
  (
    { projectId, ...restState }: any,
    { deleteProjectMember, goToPage, ...restDispatch }: any,
    { match, ...restOwn }: any
  ) => ({
    ...restState,
    ...restDispatch,
    deleteProjectMember: (memberId: number) => deleteProjectMember({ memberId, projectId }),
    ...restOwn,
  })
)(withStyles(styles, { withTheme: true })(ProjectMembersJsx));
