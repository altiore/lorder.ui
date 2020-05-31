import { connect } from 'react-redux';

import { Support } from './Support';

const masStateToProps = () => ({
  brandName: 'Lorder',
});

export default connect(masStateToProps)(Support);
