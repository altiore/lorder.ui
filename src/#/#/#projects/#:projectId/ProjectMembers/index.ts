import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { deleteProjectMember, projectMembers } from '#/@store/projects';
import { routeProjectId } from '#/@store/router';
import { ProjectMembersJsx } from './ProjectMembers';

export default connect(
  createStructuredSelector({
    projectId: routeProjectId,
    projectMembers,
  } as any),
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
)(ProjectMembersJsx);
