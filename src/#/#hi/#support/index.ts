import { connect } from 'react-redux';

import { Support } from './support';

const masStateToProps = () => ({
  brandName: 'Lorder',
});

export default connect(masStateToProps)(Support);
