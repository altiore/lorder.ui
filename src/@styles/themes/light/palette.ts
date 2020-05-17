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

export const defaultTheme: Theme = createMuiTheme({});

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    // colors
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
    main: '#FFF0B5',
  },
};
