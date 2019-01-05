import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ShortChart } from 'src/domains/@common/ShortChart';
import { IShortChartProps } from 'src/domains/@common/ShortChart/ShortChart';
import { selectedProjectWithStatistic } from 'src/store/projects';

const mapState = createStructuredSelector({
  project: selectedProjectWithStatistic,
});

export const Statistic = connect<any, any, IShortChartProps>(mapState)(ShortChart);
