import { connect } from 'react-redux';

import { updatePassword } from '#/@store/identity';

import { WrongPasswordDialog } from './wrong-password.dialog';

const mapDispatchToProps = {
  updatePassword,
};

export default connect(undefined, mapDispatchToProps)(WrongPasswordDialog);
