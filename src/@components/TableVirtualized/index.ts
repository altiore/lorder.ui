import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { ColumnType as ColumnTypeRaw, TableVirtualized } from './TableVirtualized';

export default withStyles(styles, { withTheme: true })(TableVirtualized);
export type ColumnType = ColumnTypeRaw;
