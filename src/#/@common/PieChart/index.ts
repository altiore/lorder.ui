import { connect } from 'react-redux';

import { IPieChartProps, PieChart } from '@components/PieChart';

import { setUpHighcharts } from '#/@store/highcharts';

import { withResize } from '@hooks/withResize';

const mapDispatchToProps = {
  setUpHighcharts,
};

export default connect<{}, { setUpHighcharts: any }, IPieChartProps>(
  undefined,
  mapDispatchToProps
)(withResize(PieChart));
