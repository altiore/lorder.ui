import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { createProjectPart, deleteProjectPart, fetchProjectParts, projectParts } from '#/@store/project';

import { ProjectPartsJsx } from './parts';

const mapState = createStructuredSelector({
  projectParts,
} as any);

const mapDispatch = {
  createProjectPart,
  deleteProjectPart,
  fetchProjectParts,
};

export default connect(
  mapState,
  mapDispatch
)(ProjectPartsJsx);
