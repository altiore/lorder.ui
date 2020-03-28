import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { patchUserWork } from '#/@store/user-works';

import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';

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
