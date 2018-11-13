import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { MainJsx } from './Main';
import { styles } from './styles';

const mapDispatchToProps = {
  push,
};

export const Main = connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MainJsx));
