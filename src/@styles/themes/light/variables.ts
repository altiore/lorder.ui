import { darken, lighten, Theme } from '@material-ui/core/styles';

export const BACKGROUND_DEFAULT = '#EBEEF0';
export const BACKGROUND_DARK = '#242426';

export const SECONDARY_DARK = '#FFB200';
export const SECONDARY_DARKEN = darken(SECONDARY_DARK, 0.8);
export const SECONDARY_MAIN = '#FFF0B5';
export const SECONDARY_LIGHT = lighten(SECONDARY_MAIN, 0.2);

export const CONFIRM_COLOR = '#63BA3B';

export const prettyScroll1 = (theme: Theme) => ({
  '&::-webkit-scrollbar': {
    width: theme.spacing(),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#404448',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#24292E',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#CED4D9',
    borderRadius: theme.spacing(0.5),
  },
});
