import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuth } from 'src/store/identity';
import { fetchPublicProject, publicProjectData } from 'src/store/publicProject';
import { PublicProjectTsx } from './PublicProject';
import { styles } from './styles';

const masStateToProps = createStructuredSelector({
  isAuth,
  publicProjectData,
});

const mapDispatch = {
  fetchPublicProject,
};

export const PublicProject = connect(
  masStateToProps,
  mapDispatch
)(withStyles(styles, { withTheme: true })(PublicProjectTsx));
