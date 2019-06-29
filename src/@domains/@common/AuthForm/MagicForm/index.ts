import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from '@store/@common/helpers';
import { MAGIC_FORM_NAME, postAuthMagic } from '@store/identity';
import MagicFormJsx, { IMagicFormProps } from './MagicForm';
import { styles } from './styles';

const MagicForm = withStyles(styles)(reduxForm<{}, IMagicFormProps>({
  form: MAGIC_FORM_NAME,
  onSubmit: onSubmitForm(postAuthMagic),
})(MagicFormJsx));

export { MagicForm, IMagicFormProps };