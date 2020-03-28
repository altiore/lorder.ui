import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ShortChart from '#/@common/ShortChart';
import { selectedProjectWithStatistic } from '#/@store/projects';

const mapState = createStructuredSelector({
  project: selectedProjectWithStatistic,
} as any);

export default connect(mapState)(ShortChart);
