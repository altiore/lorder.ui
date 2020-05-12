import { connect } from 'react-redux';

import { HiHeaderTsx } from './HiHeader';

const masStateToProps = () => ({
  brandName: 'Altiore',
});

export default connect(masStateToProps)(HiHeaderTsx);
