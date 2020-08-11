import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { createProjectPart, deleteProjectPart, fetchProjectParts, projectParts } from '#/@store/project';
import { projectPartsTree } from '#/@store/project';

import { ProjectPartsJsx } from './parts';

const mapState = createStructuredSelector({
  projectParts,
  projectPartsTree,
} as any);

const mapDispatch = {
  createProjectPart,
  deleteProjectPart,
  fetchProjectParts,
  push,
};

export default connect(mapState, mapDispatch)(ProjectPartsJsx);
