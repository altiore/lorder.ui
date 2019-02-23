import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { logOut, userAvatar, userEmail, userRole } from 'src/store/identity';
import { RightMenuTsx } from './RightMenu';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
};

export const RightMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RightMenuTsx));
