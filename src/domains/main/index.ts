import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { logOut, userEmail, userRole } from 'src/store/identity';
import { ownProjectListWithStatistic } from 'src/store/projects';
import { isLeftBarOpen, toggleUiSetting } from 'src/store/ui';
import { getUserWorks } from 'src/store/user-works';
import { version } from 'src/store/versionHistory';
import { MainJsx } from './Main';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  isLeftBarOpen,
  projects: ownProjectListWithStatistic,
  userEmail,
  userRole,
  version,
});

const mapDispatchToProps = {
  getUserWorks,
  logOut,
  push,
  toggleUiSetting,
};

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MainJsx) as any);
