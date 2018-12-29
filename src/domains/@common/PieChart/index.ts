import { connect } from 'react-redux';

import { IPieChartProps, PieChart } from 'src/components/PieChart';
import { withResize } from 'src/hocs/withResize';
import { setUpHighcharts } from 'src/store/highcharts';

const mapDispatchToProps = {
  setUpHighcharts,
};

export default connect<{}, { setUpHighcharts: any }, IPieChartProps>(
  undefined,
  mapDispatchToProps
)(withResize(PieChart));
