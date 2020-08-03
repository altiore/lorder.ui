import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  ArrowTopIcon: {
    bottom: -8,
    fill: '#ffb200',
    fontSize: 12,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
  },
  clocksIcon: {
    fill: '#ffb200',
    left: '50%',
    position: 'absolute',
    top: -24,
    transform: 'translateX(-50%)',
  },
  currentTimeWrap: {
    background: '#ffb200',
    borderRadius: 5,
    bottom: -30,
    color: '#fff',
    left: '50%',
    minWidth: 50,
    padding: '0 3px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateX(-50%)',
  },
  indicatorWrap: {
    background: '#ffb200',
    color: '#000',
    height: 74,
    position: 'absolute',
    top: -6,
    width: 1,
    zIndex: 1300,
  },
}));
