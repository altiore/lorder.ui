import { connect } from 'react-redux';
import { change } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';

import TaskStatus from '@components/TaskStatus';
import { PROJECT_EDIT_TASK_FORM_NAME, projectMembersAsUsers } from '@store/projects';
import { stopUserWork } from '@store/tasks';

interface IStatusFieldState {
  assignees: any[];
}

const mapState = createStructuredSelector<IState, IStatusFieldState>({
  assignees: projectMembersAsUsers,
});

const onChangeAssignee = value => change(PROJECT_EDIT_TASK_FORM_NAME, 'performerId', value);

const mapDispatch = {
  onChangeAssignee,
  onStop: stopUserWork,
};

export default connect<any, any, any, any>(
  mapState,
  mapDispatch
)(TaskStatus);
