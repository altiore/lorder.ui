import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { patchUserWork } from 'src/store/user-works';
import { DurationFieldTsx } from './DurationField';
import { styles } from './styles';

const mapDispatchToProps = {
  patchUserWork,
};

const mergeProps = (
  state: any,
  { patchUserWork, ...restDispatch }: any,
  { projectId, taskId, userWorkId, ...restOwn }: any
) => ({
  ...restDispatch,
  ...restOwn,
  updateDuration: (duration: number) => patchUserWork({ projectId, taskId, userWorkId, duration }),
});

export const DurationField = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(DurationFieldTsx));
