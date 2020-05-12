import { connect } from 'react-redux';

import { fetchAltiore } from '#/@store/publicAltiore';
import { fetchStatistics } from '#/@store/statistics';

import { HiTsx } from './Hi';

import { withResize } from '@hooks/withResize';

const masStateToProps = () => ({
  brandName: 'Altiore',
});

const mapDispatch = {
  fetchAltiore,
  fetchStatistics,
};

export default connect(
  masStateToProps,
  mapDispatch
)(withResize(HiTsx) as any);
