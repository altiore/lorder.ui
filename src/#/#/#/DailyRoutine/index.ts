import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/TimeLine';

import { openDialog } from '#/@store/dialog';
import { events } from '#/@store/tasks';
import { patchUserWork } from '#/@store/user-works';

const mapStateToProps = createStructuredSelector({
  events,
} as any);

const mapDispatch = {
  openDialog,
  patchUserWork,
};

const mergeProps = ({ ...restState }: any, { openDialog, saveUserWorks, ...restDispatch }: any, restOwn: any) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export const DailyRoutine = connect(mapStateToProps, mapDispatch, mergeProps)(TimeLine);
