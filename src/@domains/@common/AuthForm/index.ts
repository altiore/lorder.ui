import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isMagicLoginForm, toggleUiSetting } from '@store/ui';

import { AuthForm } from './AuthForm';

const mapState = createStructuredSelector({
  isMagicLoginForm: (isMagicLoginForm as any),
});

const mapDispatch = {
  toggleUiSetting,
};

export default connect<any, any, any>(mapState, mapDispatch)(AuthForm as any);
