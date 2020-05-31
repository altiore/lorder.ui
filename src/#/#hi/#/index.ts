import { connect } from 'react-redux';

import { fetchLorder } from '#/@store/publicLorder';
import { fetchStatistics } from '#/@store/statistics';

import { HiTsx } from './Hi';

import { withResize } from '@hooks/withResize';

const masStateToProps = () => ({
  brandName: 'Lorder',
});

const mapDispatch = {
  fetchLorder,
  fetchStatistics,
};

export default connect(
  masStateToProps,
  mapDispatch
)(withResize(HiTsx) as any);
