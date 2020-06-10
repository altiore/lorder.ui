import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  sectionWrap: {
    backgroundColor: '#fff',
  },
  tagline: {
    color: 'rgb(35, 35, 35)',
    fontFamily: 'Roboto',
    fontSize: 30,
    lineHeight: 1.133,
    marginBottom: 50,
    marginTop: 20,
    textAlign: 'center',
  },
}));
