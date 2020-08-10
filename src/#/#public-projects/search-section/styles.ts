import { makeStyles, Theme } from '@material-ui/core/styles';

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
    background: `url(${process.env.PUBLIC_URL}/public-projects-search-bg.png)`,
    padding: '35px 0 50px 0',
  },
  subTitle: {
    color: '#fff',
    fontWeight: 500,
    marginBottom: 35,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 500,
    textAlign: 'center',
  },
}));
