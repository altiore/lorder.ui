import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isAuth } from '#/@store/identity';
import { fetchPublicProject, publicProjectData } from '#/@store/publicProject';

import { PublicProjectTsx } from './PublicProject';

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
)(PublicProjectTsx);
