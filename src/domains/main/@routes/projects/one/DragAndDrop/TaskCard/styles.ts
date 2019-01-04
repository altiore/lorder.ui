import valueColor from '@material-ui/core/colors/green';
import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  avatar: {
    height: 28,
    width: 28,
  },
  footer: {
    alignItems: 'flex-end',
    color: '#dfe3e6',
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    borderRadius: theme.spacing.unit / 2,
    boxShadow: theme.shadows[1],
    margin: `0 0 ${theme.spacing.unit}px 0`,
    minHeight: 60,
    padding: '6px 4px 6px 8px',
    position: 'relative',
    userSelect: 'none',
  },
  title: {
    fontSize: 12,
  },
  value: {
    alignItems: 'center',
    backgroundColor: '#dfe3e6',
    borderRadius: theme.spacing.unit * 2,
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    padding: '0 4px',
    position: 'absolute',
    right: theme.spacing.unit / 2,
    top: theme.spacing.unit / 2,
  },
  valueText: {
    color: valueColor[700],
  },
});
