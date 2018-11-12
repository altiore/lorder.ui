import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { New as NewJsx } from './New';
import { styles } from './styles';

export const New = connect(
  null,
  {
    submitProjectForm: () => submit('ProjectForm'),
  }
)(withStyles(styles, { withTheme: true })(NewJsx));
