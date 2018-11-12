import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { logOut, userAvatar, userEmail, userRole } from 'src/store/identity';
import { ownProjectListWithStatistic } from 'src/store/projects';
import { HeaderTsx } from './Header';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  projects: ownProjectListWithStatistic,
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
};

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(HeaderTsx));
