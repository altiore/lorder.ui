import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { ownProjectListWithoutDefault } from '#/@store/projects';

import { IProjectFieldProps, ProjectFieldJsx } from './project-field';

const mapStateToProps = createStructuredSelector<any, any>({
  items: ownProjectListWithoutDefault,
});

export const ProjectField = connect<any, any, Partial<IProjectFieldProps>>(mapStateToProps)(ProjectFieldJsx);
