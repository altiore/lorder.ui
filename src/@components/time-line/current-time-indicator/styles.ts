import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  arrowTopIcon: {
    bottom: -8,
    fill: theme.palette.primary.main,
    fontSize: 12,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
  },
  arrowTopIconSmall: {
    bottom: -5,
    fontSize: 8,
  },
  clocksIcon: {
    fill: theme.palette.primary.main,
    left: '50%',
    position: 'absolute',
    top: -24,
    transform: 'translateX(-50%)',
  },
  clocksIconSmall: {
    fontSize: 14,
    top: -14,
  },
  currentTimeWrap: {
    background: theme.palette.primary.main,
    borderRadius: 5,
    bottom: -26,
    color: '#fff',
    left: '50%',
    minWidth: 50,
    padding: '0 3px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateX(-50%)',
  },
  currentTimeWrapSmall: {
    bottom: -23,
  },
  indicatorWrap: {
    background: theme.palette.primary.main,
    color: '#000',
    position: 'absolute',
    top: -6,
    width: 2,
    zIndex: 1300,
  },
  indicatorWrapSmall: {
    top: -4,
  },
}));
