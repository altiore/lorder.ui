import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuth } from '@store/identity';
import { fetchPublicProject, publicProjectData } from '@store/publicProject';
import { PublicProjectTsx } from './PublicProject';
import { styles } from './styles';

const masStateToProps = createStructuredSelector<any, any>({
  isAuth,
  publicProjectData,
});

const mapDispatch = {
  fetchPublicProject,
};

export default connect(
  masStateToProps,
  mapDispatch
)(withStyles(styles)(PublicProjectTsx));
