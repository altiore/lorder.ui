import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  details: {
    padding: 0,
  },
  heading: {
    flexBasis: '100%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  list: {
    width: '100%',
  },
  root: {
    width: '100%',
  },
});
