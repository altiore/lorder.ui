import { connect } from 'react-redux';

import { getAllTasks } from '@store/tasks';
import { DashboardJsx } from './Dashboard';

const mapDispatchToProps = {
  getAllTasks,
};

export default connect(
  undefined,
  mapDispatchToProps
)(DashboardJsx);
