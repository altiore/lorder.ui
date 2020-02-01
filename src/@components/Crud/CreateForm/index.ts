import { reduxForm } from 'redux-form';

import { CreateFormJsx } from './CreateForm';

export default reduxForm<any, any, any>({})(CreateFormJsx);
