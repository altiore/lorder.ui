import { connect } from 'react-redux';

import { Support } from './Support';

const masStateToProps = () => ({
  brandName: 'Altiore',
});

export default connect(masStateToProps)(Support);
