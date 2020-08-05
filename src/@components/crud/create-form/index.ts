import { reduxForm } from 'redux-form';

import { CreateFormJsx } from './create-form';

export default reduxForm<any, any, any>({})(CreateFormJsx);
