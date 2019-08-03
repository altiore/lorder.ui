import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ShortChart } from '@domains/@common/ShortChart';
import { IShortChartProps } from '@domains/@common/ShortChart/ShortChart';
import { selectedProjectWithStatistic } from '@store/projects';

const mapState = createStructuredSelector({
  project: selectedProjectWithStatistic,
} as any);

export const Statistic = connect<any, any, IShortChartProps>(mapState)(ShortChart);
