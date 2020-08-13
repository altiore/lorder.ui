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
    marginRight: theme.spacing(1 / 2),
  },
  iconStory: {
    color: '#4BC800',
    marginRight: theme.spacing(1 / 2),
  },
  progressIndicator: {
    '& > span': {
      backgroundColor: theme.palette.error.main,
      borderRadius: '50%',
      height: 6,
      width: 6,
    },
    alignItems: 'center',
    border: `1px solid ${theme.palette.pause.main}`,
    borderRadius: '50%',
    boxShadow:
      '0px 3px 5px -1px rgba(255, 51, 0,0.2), 0px 6px 10px 0px rgba(255, 51, 0,0.14), 0px 1px 18px 0px rgba(255, 51, 0,0.12)',
    display: 'flex',
    height: 12,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 12,
  },
  root: {
    borderRadius: theme.spacing(1 / 2),
    boxShadow: theme.shadows[1],
    margin: `0 0 ${theme.spacing(1)}px 0`,
    minHeight: 60,
    padding: '6px 8px',
    position: 'relative',
    userSelect: 'none',
  },
  row: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
});
