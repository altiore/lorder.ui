import { darken, lighten } from '@material-ui/core/styles';

export const primary = {
  contrastText: '#ffffff',
  dark: '#000000',
  light: '#404448',
  main: '#29292b',
};

export const secondary = {
  contrastText: '#29292b',
  dark: '#FFB200',
  light: '#f9edad',
  main: '#FFF0B5',
};

export const error = {
  contrastText: '#ffffff',
  dark: darken('#ec3b0f', 0.1),
  light: lighten('#ec3b0f', 0.1),
  main: '#ec3b0f',
};

export const background = {
  default: '#EBEEF0',
  paper: '#ffffff',
};
