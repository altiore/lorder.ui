import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  helperText: {
    border: 0,
  },
  helperTextDefaultError: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: `1px solid red`,
    borderRadius: 5,
    height: 'min-content',
    margin: 0,
    padding: 5,
    position: 'relative',
    top: 5,
  },
}));
