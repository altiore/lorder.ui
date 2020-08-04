import { reduxForm } from 'redux-form';

import { SupportForm } from './support-form';

export default reduxForm<any, any>({
  form: 'SupportForm',
  onSubmit: values => {
    console.log('values', { values });
  },
})(SupportForm);
