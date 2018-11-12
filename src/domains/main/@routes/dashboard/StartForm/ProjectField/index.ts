import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ownProjectListNoProjectFirst } from 'src/store/projects/index';
import { IProjectFieldProps, ProjectFieldJsx } from './ProjectField';

const mapStateToProps = createStructuredSelector<any, any>({
  items: ownProjectListNoProjectFirst,
});

export const ProjectField = connect<any, any, IProjectFieldProps>(mapStateToProps)(ProjectFieldJsx);
