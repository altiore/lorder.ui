import { connect } from 'react-redux';

import { HiHeaderTsx } from './HiHeader';

const masStateToProps = () => ({
  brandName: 'Lorder',
});

export default connect(masStateToProps)(HiHeaderTsx);
