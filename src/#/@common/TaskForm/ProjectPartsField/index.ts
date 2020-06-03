import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectParts, projectParts } from '#/@store/project';
import { getTaskProjectParts } from '#/@store/tasks';

import { ProjectPartsFieldTsx } from './ProjectPartsField';

const mapStateToProps = createStructuredSelector({
  getTaskProjectParts,
  projectParts,
} as any);

const mapDispatch = {
  fetchProjectParts,
};

export default connect(mapStateToProps, mapDispatch)(ProjectPartsFieldTsx);
