import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getTaskColumnsByProjectId } from '#/@store/projects';

import { StatusField } from './StatusField';

import { IState, ITaskStatus } from '@types';

interface IStatusFieldSmall {
  getTaskColumnsByProjectId: (id: number) => ITaskStatus[];
}

const mapState = createStructuredSelector<IState, IStatusFieldSmall>({
  getTaskColumnsByProjectId,
});

export default connect(mapState)(StatusField);
