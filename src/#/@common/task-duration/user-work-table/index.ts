import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentUserWorkId } from '#/@store/timer';
import {
  /*deleteUserWork, */ getUserWorksBySequenceNumber,
  getUserWorksByTaskId,
  startTimer,
  stopUserWork,
} from '#/@store/user-works';

import { UserWorkTableJsx } from './user-work-table';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
  getUserWorksByTaskId,
} as any);

const mapDispatchToProps = {
  // deleteUserWork,
  getUserWorksBySequenceNumber,
  startTimer,
  stopUserWork,
};

export const UserWorkTable = connect(mapStateToProps, mapDispatchToProps)(UserWorkTableJsx) as any;
