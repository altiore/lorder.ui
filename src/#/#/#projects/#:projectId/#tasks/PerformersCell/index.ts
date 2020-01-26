import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PerformerFieldRaw from '#/@common/PerformerField';
import { projectMembersAsUsers } from '#/@store/projects';
import { patchProjectTask } from '#/@store/tasks';
import { routeProjectId } from '#/@store/router';
import { IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, { projectId?: number; projectMembers: any[] }>({
  projectId: routeProjectId,
  projectMembers: projectMembersAsUsers,
});

const mapDispatchToProps = {
  patchProjectTask,
};

export const PerformersCell = connect<any, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(PerformerFieldRaw);
