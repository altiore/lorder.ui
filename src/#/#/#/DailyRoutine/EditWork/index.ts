import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';

import { patchUserWork } from '#/@store/user-works';
import { EditWorkTsx, IEditWorkData } from './EditWork';
import { styles } from './styles';

const mapState = createStructuredSelector({});

const formConfig = {
  form: 'EditWorkForm',
  onSubmit: async (values: IEditWorkData, dispatch: ThunkDispatch<any, any, any>) => {
    return await dispatch(patchUserWork(values));
  },
  onSubmitSuccess: (res: any, dispatch: ThunkDispatch<any, any, any>, { onClose }: any) => {
    if (onClose) {
      onClose();
    }
  },
};

export default withStyles(styles, { withTheme: true })(connect(mapState)(reduxForm(formConfig)(EditWorkTsx)));
