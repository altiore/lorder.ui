import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/TimeLine';
import { openDialog } from '#/@store/dialog';
import { events } from '#/@store/tasks';
import EditWork from './EditWork';

const mapStateToProps = createStructuredSelector({
  EditEvent: () => EditWork,
  events,
} as any);

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
