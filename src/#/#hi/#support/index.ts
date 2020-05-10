import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { withResize } from '@hooks/withResize';

import { styles } from './styles';
import { Support } from './Support';
// export { Support as default } from './Support';

const masStateToProps = () => ({
  brandName: 'Altiore',
});

export default connect(
  masStateToProps,
)(withStyles(styles)(withResize(Support)) as any);
