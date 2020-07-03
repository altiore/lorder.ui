import { Color, createMuiTheme, PaletteColorOptions, PaletteType, Theme } from '@material-ui/core';
import { darken, lighten } from '@material-ui/core/styles';
import {
  ColorPartial,
  CommonColors,
  Palette,
  PaletteColor,
  PaletteTonalOffset,
  TypeAction,
  TypeBackground,
  TypeDivider,
  TypeText,
} from '@material-ui/core/styles/createPalette';

import { ACCESS_LEVEL } from '@types';

export const defaultTheme: Theme = createMuiTheme({});

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    // colors
    access: { [key in ACCESS_LEVEL]: PaletteColor };

    default: PaletteColor;
    error: PaletteColor;
    info: PaletteColor;
    pause: PaletteColor;
    primary: PaletteColor;
    secondary: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;

    action: TypeAction;
    augmentColor: {
      (
        color: ColorPartial,
        mainShade?: number | string,
        lightShade?: number | string,
        darkShade?: number | string
      ): PaletteColor;
      (color: PaletteColorOptions): PaletteColor;
    };
    background: TypeBackground;
    common: CommonColors;
    contrastThreshold: number;
    divider: TypeDivider;
    getContrastText: (background: string) => string;
    grey: Color;
    text: TypeText;
    tonalOffset: PaletteTonalOffset;
    type: PaletteType;
  }

  interface PaletteOptions {
    access?: { [key in ACCESS_LEVEL]?: PaletteColorOptions };

    default?: PaletteColorOptions;
    error?: PaletteColorOptions;
    info?: PaletteColorOptions;
    pause?: PaletteColorOptions;
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;

    action?: Partial<TypeAction>;
    common?: Partial<CommonColors>;
    contrastThreshold?: number;
    background?: Partial<TypeBackground>;
    divider?: string;
    getContrastText?: (background: string) => string;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    tonalOffset?: PaletteTonalOffset;
    type?: PaletteType;
  }
}

export const palette: Palette = {
  ...defaultTheme.palette,

  access: {
    [ACCESS_LEVEL.WHITE]: {
      contrastText: '#292929',
      dark: '#fff',
      light: '#fff',
      main: '#d1d1d1',
    },
    [ACCESS_LEVEL.RED]: {
      contrastText: '#6a1e10',
      dark: '#000000',
      light: '#f0aa9d',
      main: '#ffa6b1',
    },
    [ACCESS_LEVEL.ORANGE]: {
      contrastText: '#7b3d0e',
      dark: '#000000',
      light: '#ffcd7f',
      main: '#ffe700',
    },
    [ACCESS_LEVEL.YELLOW]: {
      contrastText: '#7b3d0e',
      dark: '#000000',
      light: '#ffe87f',
      main: '#f8c26e',
    },
    [ACCESS_LEVEL.GREEN]: {
      contrastText: '#0f551f',
      dark: '#000000',
      light: '#c0e6c9',
      main: '#9edea1',
    },
    [ACCESS_LEVEL.BLUE]: {
      contrastText: '#1a5c93',
      dark: '#000000',
      light: '#c3e3fd',
      main: '#90dcff',
    },
    [ACCESS_LEVEL.INDIGO]: {
      contrastText: '#031fae',
      dark: '#000000',
      light: '#94a5fd',
      main: '#35b5ef',
    },
    [ACCESS_LEVEL.VIOLET]: {
      contrastText: '#4f145f',
      dark: '#000000',
      light: '#c7b8f1',
      main: '#774ced',
    },
  },

  background: {
    default: '#EBEEF0',
    paper: '#ffffff',
  },

  default: {
    contrastText: '#ffffff',
    dark: '#000000',
    light: '#404448',
    main: '#29292b',
  },
  error: {
    contrastText: '#ffffff',
    dark: darken('#ec3b0f', 0.1),
    light: lighten('#ec3b0f', 0.1),
    main: '#ec3b0f',
  },
  pause: {
    contrastText: '#000',
    dark: '#292929',
    light: '#fcfaee',
    main: '#676767',
  },
  primary: {
    contrastText: '#29292b',
    dark: darken('#ffb200', 0.1),
    light: '#eecf6d',
    main: '#ffb200',
  },
  secondary: {
    contrastText: '#29292b',
    dark: '#FFB200',
    light: '#f9edad',
    main: '#FAF0B5',
  },
  success: {
    contrastText: '#fff',
    dark: '#62C531',
    light: '#62C531',
    main: '#62C531',
  },
};
