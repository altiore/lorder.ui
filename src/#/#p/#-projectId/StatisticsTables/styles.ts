import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  h2: {
    color: '#29292b',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 500,
  },
  searchGroupWrap: {
    margin: '15px 0',
    padding: '0 30px 0 45px',
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: '-8px',
    marginRight: 5,
  },

  searchInput: {
    border: 0,
    maxWidth: 320,
    padding: '5px 0',
  },
  tableContainer: {
    ...theme.mainContent.scroll,
    maxHeight: 500,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  tableGroupHeader: {
    padding: '0 10px',
  },
  tableGroupWrap: {
    boxShadow: ' 0 10px 50px #f1f2f6',
    margin: '40px 25px',
    maxHeight: 724,
    maxWidth: 620,
    padding: '0 15px',
    width: '100%',
  },
  tablesWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  tableWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: '0 auto',
    maxHeight: 500,
    maxWidth: 530,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
