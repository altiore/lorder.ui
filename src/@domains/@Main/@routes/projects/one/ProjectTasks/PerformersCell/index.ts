import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PerformerFieldRaw from '@domains/@common/PerformerField';
import { patchProjectTask, projectMembersAsUsers } from '@store/projects';
import { routeProjectId } from '@store/router';
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
