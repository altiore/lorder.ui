import valueColor from '@material-ui/core/colors/green';
import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  footer: {
    alignItems: 'flex-end',
    color: '#dfe3e6',
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconBug: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1/2),
  },
  iconStory: {
    color: '#4BC800',
    marginRight: theme.spacing(1/2),
  },
  root: {
    borderRadius: theme.spacing(1/2),
    boxShadow: theme.shadows[1],
    margin: `0 0 ${theme.spacing(1)}px 0`,
    minHeight: 60,
    padding: '6px 4px 6px 8px',
    position: 'relative',
    userSelect: 'none',
  },
  row: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  value: {
    alignItems: 'center',
    backgroundColor: '#dfe3e6',
    borderRadius: theme.spacing(2),
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    padding: '0 4px',
    // position: 'absolute',
    // right: theme.spacing(1/2),
    // top: theme.spacing(1/2),
  },
  valueText: {
    color: valueColor[700],
  },
});
