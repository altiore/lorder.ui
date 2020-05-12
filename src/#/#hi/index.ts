import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { userRole } from '#/@store/identity';
import { fetchAltiore } from '#/@store/publicAltiore';
import { fetchStatistics } from '#/@store/statistics';

import { HiTsx } from './hi-layout';
import { styles } from './styles';

const brandName = () => 'Altiore';

const mapStateToProps = createStructuredSelector({
  brandName,
  userRole,
});

const mapDispatch = {
  fetchAltiore,
  fetchStatistics,
};

export default connect(
  mapStateToProps,
  mapDispatch
)(withStyles(styles)(HiTsx) as any);
