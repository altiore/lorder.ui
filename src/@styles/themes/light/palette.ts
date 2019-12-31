import { lighten } from '@material-ui/core/styles';

export const primary = {
  contrastText: '#ffffff',
  dark: '#000000',
  light: '#404448',
  main: '#242426',
};

export const secondary = {
  contrastText: '#24292E',
  dark: '#FFB200',
  light: lighten('#FFF0B5', 0.2),
  main: '#FFF0B5',
};

export const error = {};

export const background = {
  default: '#EBEEF0',
  paper: '#ffffff',
};
