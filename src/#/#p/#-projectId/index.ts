import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isAuth } from '#/@store/identity';
import { fetchPublicProject, publicProjectData } from '#/@store/publicProject';
import { rolesList } from '#/@store/roles';

import { PublicProjectTsx } from './PublicProject';

const masStateToProps = createStructuredSelector<any, any>({
  isAuth,
  publicProjectData,
  rolesList,
});

const mapDispatch = {
  fetchPublicProject,
};

export default connect(masStateToProps, mapDispatch)(PublicProjectTsx);
