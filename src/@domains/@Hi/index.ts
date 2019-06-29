import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { withResize } from '@hooks/withResize';
import { HiTsx } from './Hi';
import { styles } from './styles';

const masStateToProps = () => ({
  brandName: 'Altiore',
});

export default connect(masStateToProps)(withStyles(styles)(withResize(HiTsx)) as any);
