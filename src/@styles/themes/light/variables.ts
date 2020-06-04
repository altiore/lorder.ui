import { lighten, Theme } from '@material-ui/core/styles';

export const BACKGROUND_DEFAULT = '#EBEEF0';
export const BACKGROUND_DARK = '#242426';

export const SECONDARY_DARK = '#FFB200';
export const SECONDARY_DARKEN = '#d1bf73';
export const SECONDARY_MAIN = '#FFF0B5';
export const SECONDARY_LIGHT = lighten(SECONDARY_MAIN, 0.2);

export const CONFIRM_COLOR = '#63BA3B';

export const prettyScroll1 = (theme: Theme) => ({
  '&::-webkit-scrollbar': {
    width: theme.spacing(1),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#919191',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#737271',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#CED4D9',
    borderRadius: theme.spacing(0.5),
  },
});

export const prettyScroll2 = (theme: Theme) => ({
  '&::-webkit-scrollbar': {
    width: 7,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#FAF0B5',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#FFB200',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#424246',
    borderRadius: theme.spacing(0.5),
  },
});
