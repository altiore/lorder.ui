import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { TimeLine } from 'src/components/TimeLine';
import { openDialog } from 'src/store/dialog';
import { events } from 'src/store/tasks';
import EditWork from './EditWork';

const mapStateToProps = createStructuredSelector({
  EditEvent: () => EditWork,
  events,
});

const mapDispatch = {
  openDialog,
};

const mergeProps = ({ ...restState }: any, { openDialog, saveUserWorks, ...restDispatch }: any, restOwn: any) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export const DailyRoutine = connect(
  mapStateToProps,
  mapDispatch,
  mergeProps
)(TimeLine);
