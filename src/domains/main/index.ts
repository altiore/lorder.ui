import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { createStructuredSelector } from 'reselect';

import { IState } from 'src/@types';
import { logOut } from 'src/store/identity';
import { ownProjectListWithStatistic } from 'src/store/projects';
import { isLeftBarOpen, toggleUiSetting } from 'src/store/ui';
import { getUserWorks } from 'src/store/user-works';
import { MainJsx } from './Main';
import { styles } from './styles';

export const Main = connect(
  (state: IState) => ({
    isLeftBarOpen: isLeftBarOpen(state),
    projects: ownProjectListWithStatistic(state),
  }),
  {
    getUserWorks,
    logOut,
    push,
    toggleUiSetting,
  }
)(withStyles(styles, { withTheme: true })(MainJsx) as any);
