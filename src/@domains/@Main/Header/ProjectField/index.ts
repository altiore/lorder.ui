import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ownProjectListNoProjectFirst } from '@store/projects';
import { IProjectFieldProps, ProjectFieldJsx } from './ProjectField';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector<any, any>({
  items: ownProjectListNoProjectFirst,
});

export const ProjectField = connect<any, any, Partial<IProjectFieldProps>>(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ProjectFieldJsx)
);
