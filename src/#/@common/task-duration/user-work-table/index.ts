import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentUserWorkId } from '#/@store/timer';
import { changeCustomRange, toggleUiSetting } from '#/@store/ui';
import { getUserWorksBySequenceNumber, getUserWorksByTaskId, startTimer, stopUserWork } from '#/@store/user-works';

import { UserWorkTableJsx } from './user-work-table';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
  getUserWorksByTaskId,
} as any);

const mapDispatchToProps = {
  changeCustomRange,
  getUserWorksBySequenceNumber,
  startTimer,
  stopUserWork,
  toggleUiSetting,
};

export const UserWorkTable = connect(mapStateToProps, mapDispatchToProps)(UserWorkTableJsx) as any;
