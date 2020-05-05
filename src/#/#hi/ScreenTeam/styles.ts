import { makeStyles, Theme } from '@material-ui/core/styles';

const MIN_HEIGHT = 'calc(50vh - 80px)';

export const useStyles = makeStyles((theme: Theme) => ({
  achievement: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: MIN_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  achievementBlock: {
    alignItems: 'flex-start',
  },
  backTitle: {
    bottom: theme.typography.pxToRem(-130),
    color: '#242327',
    fontSize: theme.typography.pxToRem(300),
    fontWeight: 'bold',
    left: `calc(50% - 588px);`,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loader: {
    alignItems: 'center',
    color: theme.palette.primary.dark,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: theme.spacing(4),
  },
  members: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  numbers: {
    marginTop: theme.spacing(2),
    zIndex: 1,
  },
  personsBlock: {
    margin: 0,
    width: '100%',
  },
  team: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: MIN_HEIGHT,
    // padding: theme.spacing(2),
    zIndex: 1,
  },
}));
