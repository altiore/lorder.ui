import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { userRole } from '#/@store/identity';
import { fetchLorder } from '#/@store/publicLorder';
import { fetchStatistics } from '#/@store/statistics';

import { HiTsx } from './hi-layout';
import { styles } from './styles';

const brandName = () => 'Lorder';

const mapStateToProps = createStructuredSelector({
  brandName,
  userRole,
});

const mapDispatch = {
  fetchLorder,
  fetchStatistics,
};

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(HiTsx) as any);
