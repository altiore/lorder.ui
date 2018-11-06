import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProject } from 'src/store/project';
import { ownProjectList } from 'src/store/projects';
import { IProjectFieldProps, ProjectFieldJsx } from './ProjectField';

const mapStateToProps = createStructuredSelector<any, any>({
  items: ownProjectList,
});

const mapDispatch = {
  selectProject: (e: any, value: any) => selectProject(value),
};

export const ProjectField = connect<any, any, IProjectFieldProps>(
  mapStateToProps,
  mapDispatch
)(ProjectFieldJsx);
