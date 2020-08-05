import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  InputAdornment: { position: 'relative' },
  searchIcon: {
    fontSize: 20,
    marginLeft: '-8px',
    marginRight: 8,
  },
  searchIconCentered: {
    color: '#ffb200',
    marginLeft: 25,
  },
  searchInput: {
    '&::placeholder': {
      color: '#c5c5c5',
    },
    border: 0,
    maxWidth: 320,
    padding: '5px 0',
  },
  searchInputCentered: {
    '&::placeholder': {
      color: '#232323',
    },
  },
}));
