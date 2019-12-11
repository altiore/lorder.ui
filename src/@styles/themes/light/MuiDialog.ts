import { Theme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

import { prettyScroll1 } from './variables';

export default function(theme: Theme): Partial<Overrides> {
  return {
    MuiDialogActions: {
      root: {
        height: theme.typography.pxToRem(56),
        padding: `0 ${theme.typography.pxToRem(22)}`,
        [theme.breakpoints.down('sm')]: {
          bottom: 0,
          margin: 0,
          padding: '4px',
          position: 'fixed',
          width: 'calc(100% - 8px)',
          zIndex: 100,
        },
      },
    },
    MuiDialogContent: {
      root: {
        padding: `0 ${theme.typography.pxToRem(22)}`,
        ...prettyScroll1(theme),
      },
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexFlow: 'row nowrap',
        height: theme.typography.pxToRem(56),
        justifyContent: 'space-between',
        padding: `0 ${theme.typography.pxToRem(11)}`,
      },
    },
  };
}
