import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  bold: {
    fontWeight: 400,
  },
  currentUserRow: {
    backgroundColor: '#f6f8fa',
  },
  currentUserWrap: {
    bottom: 0,
    height: 49,
    left: 29,
    lineHeight: '49px',
    position: 'absolute',
    width: '90%',
  },
  currentUserWrapTop: {
    top: 79,
  },
  h2: {
    color: '#29292b',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 500,
  },
  light: {
    fontWeight: 300,
  },
  listWrap: {
    '& $currentUserRow': {
      borderBottom: 0,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    lineHeight: '49px',
    margin: '0 auto',
    maxWidth: 530,
    position: 'relative',
  },
  rowCell: { fontSize: 18 },
  rowWrap: {
    '& $rowCell:first-child': {
      flexBasis: '50px',
      textAlign: 'center',
    },
    '& $rowCell:nth-child(2)': {
      flexBasis: 295,
      paddingLeft: 12,
    },
    '& $rowCell:nth-child(3)': {
      flexBasis: 100,
    },
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    display: 'flex',
    fontSize: 18,
    height: 49,
    lineHeight: '49px',
    width: '100%',
  },
  searchGroupWrap: {
    lineHeight: '49px',
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
  tableCell: {
    '& b': {
      fontWeight: 400,
    },
    fontSize: 18,
    height: 49,
    paddingLeft: 18,
    verticalAlign: 'center',
    width: '25%',
  },

  tableCellInHeader: {
    background: '#fff',
    borderBottom: '1px solid #000',
    paddingTop: 5,
  },
  tableContainer: {
    maxHeight: 550,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
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

  tableRow: {
    display: 'flex',
    fontWeight: 300,
    margin: '20px auto 10px auto',
    maxWidth: 530,
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
  trendingIcon: {
    color: 'rgb(255, 178, 0)',
    fontSize: 35,
    lineHeight: 45,
    marginTop: -5,
  },
  usersQuantity: {
    fontWeight: 500,
    paddingLeft: 2,
  },
}));
