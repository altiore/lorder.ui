import { makeStyles, Theme } from '@material-ui/core/styles';

import BackGroundPng from './public-projects-search-bg.png';

export const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '& > fieldset': {
      border: 0,
    },
  },
  inputWrap: {
    borderRadius: 10,
    margin: '0 auto',
    maxWidth: 360,
  },
  search: {
    background: `url(${BackGroundPng})`,
    padding: '88px 0 32px 0',
  },
  title: {
    color: '#fff',
    fontSize: theme.typography.pxToRem(30),
    fontWeight: 500,
    marginBottom: 24,
    textAlign: 'center',
  },
}));
