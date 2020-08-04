import { connect } from 'react-redux';

import { HiHeaderTsx } from './hi-header';

const masStateToProps = () => ({
  brandName: 'Lorder',
});

export default connect(masStateToProps)(HiHeaderTsx);
