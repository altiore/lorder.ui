import { Theme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

export default function(theme: Theme, hideScrollbar): Partial<Overrides> {
  return {
    MuiFormHelperText: {
      root: {
        ...hideScrollbar,
        backgroundColor: 'transparent',
        bottom: theme.typography.pxToRem(-13),
        left: 0,
        maxHeight: 12,
        overflowY: 'auto',
        position: 'absolute',
      },
    },
    MuiInputAdornment: {
      positionStart: {
        '& > svg': {
          fontSize: theme.typography.pxToRem(22),
        },
        left: theme.typography.pxToRem(7),
        position: 'absolute',
        zIndex: 1,
      },
      root: {
        color: '#878787',
      },
    },
    MuiInputBase: {
      input: {
        borderRadius: theme.typography.pxToRem(4),
        height: 'unset',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 11px) scale(1)',
      },
    },
    MuiOutlinedInput: {
      adornedStart: {
        paddingLeft: 0,
      },
      input: {
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        fontSize: theme.typography.pxToRem(16),
        height: theme.typography.pxToRem(36),
        minWidth: theme.typography.pxToRem(theme.spacing(20)),
        padding: theme.typography.pxToRem(theme.spacing(1)),
        position: 'absolute',
      },
      inputAdornedStart: {
        paddingLeft: theme.typography.pxToRem(theme.spacing(4.25)),
      },
      notchedOutline: {
        zIndex: 1,
      },
      root: {
        backgroundColor: 'transparent',
        borderRadius: theme.typography.pxToRem(theme.shape.borderRadius),
        height: theme.typography.pxToRem(36),
        minWidth: 120,
      },
    },
  };
}
