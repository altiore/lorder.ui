import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    margin: 2,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  arrowDown: {
    transform: 'rotate(180deg)',
  },
  arrowWrap: {
    alignItems: 'center',
    backgroundColor: '#dfe3e6',
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
  },
  column: {
    alignItems: 'center',
    backgroundColor: '#dfe3e6',
    borderRadius: 3,
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: theme.spacing(0, 1),
    padding: '0 4px 0 0',
  },
  columnContent: {
    ...theme.mainContent.scroll,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: `0 4px 2px 8px`,
  },
  columnFooter: {
    borderRadius: theme.spacing(1 / 2),
    height: 40,
    width: '100%',
  },
  columnTitle: {
    alignItems: 'center',
    borderTopLeftRadius: theme.spacing(1 / 2),
    borderTopRightRadius: theme.spacing(1 / 2),
    display: 'flex',
    flexFlow: 'row nowrap',
    height: 40,
    justifyContent: 'space-between',
    lineHeight: '40px',
    marginBottom: theme.spacing(1 / 2),
    padding: `0 4px 0 10px`,
    position: 'relative',
    width: '100%',
  },
  placeholderCard: {
    alignItems: 'center',
    borderRadius: theme.spacing(1 / 2),
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'center',
    margin: `0 0 ${theme.spacing(1)}px 0`,
    minHeight: 60,
    padding: '6px 4px 6px 8px',
    position: 'relative',
    userSelect: 'none',
  },
  pointer: {
    cursor: 'pointer',
  },
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(3, 1),
    width: 'fit-content',
  },
}));
