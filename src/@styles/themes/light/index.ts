import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { PaletteColor, PaletteColorOptions } from '@material-ui/core/styles/createPalette';

import MuiDialog from './MuiDialog';
import MuiTextField from './MuiTextField';
import { background, error, pause, primary, secondary } from './palette';
import { prettyScroll1, SECONDARY_DARKEN } from './variables';

const defaultTheme: Theme = createMuiTheme({});

export default createMuiTheme({
  themeName: 'LIGHT',

  gradient: ['linear-gradient(45deg, #29292b 0%, #424247 50%, #29292b 100%)'],
  mainContent: {
    scroll: prettyScroll1,
    width: 1012,
  },
  mixins: {
    toolbar: {
      height: 56,
    },
  },
  overrides: {
    ...MuiDialog(defaultTheme),
    ...MuiTextField(defaultTheme),
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 16px 16px',
      },
    },
    MuiFab: {
      sizeMedium: {
        height: '44px',
        width: '44px',
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: defaultTheme.shape.borderRadius,
        padding: defaultTheme.typography.pxToRem(7),
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: 6,
        paddingRight: 6,
      },
      root: {
        zIndex: defaultTheme.zIndex.drawer + 1,
        [defaultTheme.breakpoints.down('sm')]: {
          ...(defaultTheme.overrides as any).MuiAppBar,
          padding: 0,
        },
      },
    },
  },
  palette: {
    background,
    error,
    primary,
    secondary,
  },
  pauseColor: pause,
  props: {
    MuiSelect: {
      variant: 'outlined',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
  shadow: {
    secondary: '0 4px 10px rgba(242, 213, 120, 0.5)',
  },
  shape: {
    borderRadius: 4,
    borderRadius2: 8,
  },
  textGradient: [
    {
      '-webkit-background-clip': 'text',
      background: `linear-gradient(45deg,
      ${SECONDARY_DARKEN} 35%,
       ${secondary.light} 50%,
        ${SECONDARY_DARKEN} 65%
         )`,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  ],
  typography: {
    body1: {
      fontSize: defaultTheme.typography.pxToRem(16),
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: defaultTheme.typography.pxToRem(12),
      lineHeight: defaultTheme.typography.pxToRem(12),
    },
    h1: {
      fontSize: defaultTheme.typography.pxToRem(55),
      fontWeight: 'bold',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(34),
      },
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(50),
      fontWeight: 'bold',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(32),
      },
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(30),
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(24),
      fontWeight: 400,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 500,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(13),
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(22),
      fontWeight: 200,
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: defaultTheme.typography.pxToRem(20),
      },
    },
    subtitle2: {
      fontSize: defaultTheme.typography.pxToRem(10),
    },
  },
});

declare module '@material-ui/core/styles/shape' {
  interface Shape {
    borderRadius: number;
    borderRadius2: number;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    gradient: string[];
    mainContent: {
      scroll: object;
      width: number;
    };
    pauseColor: PaletteColor;
    shadow: {
      secondary: string;
    };
    textGradient: object[];
    themeName?: string;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    gradient?: string[];
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    pauseColor?: PaletteColorOptions;
    shadow?: {
      secondary?: string;
    };
    textGradient?: object[];
    themeName?: string;
  }
}
