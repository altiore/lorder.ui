import { withStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { patchUserWork } from 'src/store/user-works';
import { EditWorkTsx, IEditWorkData } from './EditWork';
import { styles } from './styles';

const mapState = createStructuredSelector({});

const formConfig = {
  form: 'EditWorkForm',
  onSubmit: async (values: IEditWorkData, dispatch: Dispatch) => {
    return await dispatch(patchUserWork(values));
  },
  onSubmitSuccess: (res: any, dispatch: Dispatch, { onClose }: any) => {
    if (onClose) {
      onClose();
    }
  },
};

export default withStyles(styles, { withTheme: true })(connect(mapState)(reduxForm(formConfig)(EditWorkTsx)));
