import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  configureButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  flexContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  noClick: {
    cursor: 'initial',
  },
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  tableCell: {
    flex: 1,
  },
  tableRow: {
    '&:not(.ReactVirtualized__Table__headerRow):nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
});
