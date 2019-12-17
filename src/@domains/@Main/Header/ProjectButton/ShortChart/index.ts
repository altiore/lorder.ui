import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProjectWithStatistic } from '@store/projects';
import ShortChart from '@domains/@common/ShortChart';

const mapState = createStructuredSelector({
  project: selectedProjectWithStatistic,
} as any);

export default connect(mapState)(ShortChart);
