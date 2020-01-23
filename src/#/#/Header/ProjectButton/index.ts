import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Project, selectedProject } from '#/@store/projects';
import { ProjectButtonTsx } from './ProjectButton';

const mapState = createStructuredSelector({
  selectedProject,
}) as any;

export default connect<{ selectedProject: Project }>(mapState)(ProjectButtonTsx as any) as any;
