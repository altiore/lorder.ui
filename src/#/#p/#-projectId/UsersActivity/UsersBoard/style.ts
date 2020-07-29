import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  board: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 10px 50px #f1f2f6',
    maxWidth: '720px',
    paddingBottom: 15,
    paddingLeft: 46,
    paddingRight: 15,
    paddingTop: 43,
    width: '100%',
  },
  boardTitle: {
    color: '#29292b',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 45,
    marginTop: 0,
  },
  cardsWrap: {
    ...theme.mainContent.scroll,
    maxHeight: 490,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));
