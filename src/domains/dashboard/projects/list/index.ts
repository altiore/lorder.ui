import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { getAllProjects, projectList } from 'src/store/projects';
import { Projects as ProjectsJsx } from './Projects';
import { styles } from './styles';

export const Projects = connect(
  createStructuredSelector({
    projectList,
  }),
  {
    closeDialog,
    getAllProjects,
    goToPage: push,
    openDialog,
  },
  (state: any, { goToPage, ...restDispatch }: any, { match, ...restOwn }: any) => ({
    ...state,
    ...restDispatch,
    goToProject: (id: number) => goToPage(`${match.url}/${id}`),
    ...restOwn,
  })
)(withStyles(styles, { withTheme: true })(ProjectsJsx));
