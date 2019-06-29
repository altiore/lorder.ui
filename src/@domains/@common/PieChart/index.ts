import { connect } from 'react-redux';

import { IPieChartProps, PieChart } from '@components/PieChart';
import { withResize } from '@hooks/withResize';
import { setUpHighcharts } from '@store/highcharts';

const mapDispatchToProps = {
  setUpHighcharts,
};

export default connect<{}, { setUpHighcharts: any }, IPieChartProps>(
  undefined,
  mapDispatchToProps
)(withResize(PieChart));
