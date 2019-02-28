import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { EditWorkTsx } from './EditWork';
import { styles } from './styles';

const mapState = createStructuredSelector({});

export default withStyles(styles, { withTheme: true })(
  connect(mapState)(
    reduxForm({
      form: 'EditWorkForm',
    })(EditWorkTsx)
  )
);
