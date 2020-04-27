import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ShortChart from '#/@common/ShortChart';
import { selectedProject } from '#/@store/projects';

const mapState = createStructuredSelector({
  project: selectedProject,
} as any);

export default connect(mapState)(ShortChart);
