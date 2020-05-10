import { reduxForm } from 'redux-form';

import { SubscribeForm } from './SubscribeForm';

export default reduxForm<any, any>({
  form: 'SubscribeForm',
  onSubmit: values => {
    alert('Подписка в разработке: ' + values.email);
  },
})(SubscribeForm);
