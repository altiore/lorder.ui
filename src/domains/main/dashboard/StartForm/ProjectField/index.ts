import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ownProjectList } from 'src/store/projects';
import { IProjectFieldProps, ProjectFieldJsx } from './ProjectField';

const mapStateToProps = createStructuredSelector<any, any>({
  items: ownProjectList,
});

export const ProjectField = connect<any, any, IProjectFieldProps>(mapStateToProps)(ProjectFieldJsx);
