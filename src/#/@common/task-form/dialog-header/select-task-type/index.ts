import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { projectTaskTypes } from '#/@store/projects';

import { SelectTaskType } from './select-task-type';

const mapStateToProps = createStructuredSelector({
  items: projectTaskTypes,
} as any);

export default connect(mapStateToProps)(SelectTaskType);
