import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IEvent, IUserWork } from 'src/@types';
import { TimeLine } from 'src/components/TimeLine';
import { openDialog } from 'src/store/dialog';
import { events } from 'src/store/tasks';
import { isRequiredConfirmationChangedEvents } from 'src/store/ui';
// import { updateUserWork } from 'src/store/user-works';
// import { ConfirmDialogTsx } from './ConfirmDialog';

const mapStateToProps = createStructuredSelector({
  events,
  isRequiredConfirmationChangedEvents,
});

const mapDispatch = {
  onEventClick: ({ data: { projectId, taskId } }: IEvent<IUserWork>) =>
    push({
      pathname: `/projects/${projectId}/tasks/${taskId}`,
      state: {
        modal: true,
        projectId,
        taskId,
      },
    }),
  openDialog,
  // updateUserWork,
};

const mergeProps = (
  { isRequiredConfirmationChangedEvents, ...restState }: any,
  { openDialog, saveUserWorks, ...restDispatch }: any,
  restOwn: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export const DailyRoutine = connect(
  mapStateToProps,
  mapDispatch,
  mergeProps
)(TimeLine);
