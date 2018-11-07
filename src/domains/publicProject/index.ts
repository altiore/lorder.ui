import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchPublicProject, publicProjectData } from 'src/store/publicProject';
import { team } from './data';
import { PublicProjectTsx } from './PublicProject';
import { styles } from './styles';

const masStateToProps = createStructuredSelector({
  publicProjectData,
  team: () => team,
});

const mapDispatch = {
  fetchPublicProject,
};

export const PublicProject = connect(
  masStateToProps,
  mapDispatch
)(withStyles(styles, { withTheme: true })(PublicProjectTsx));
