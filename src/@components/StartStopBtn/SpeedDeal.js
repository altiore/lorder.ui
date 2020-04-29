import * as React from 'react';

import clsx from 'classnames';
import { duration, makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { capitalize, isMuiElement, useForkRef } from '@material-ui/core/utils';

function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }
  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }
  return undefined;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

const dialRadius = 32;
const spacingActions = 16;

export const useStyles = makeStyles(theme => ({
  /* Styles applied to the root element. */
  root: {
    zIndex: theme.zIndex.speedDial,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  /* Styles applied to the Fab component. */
  fab: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the root if direction="up" */
  directionUp: {
    flexDirection: 'column-reverse',
    '& $actions': {
      flexDirection: 'column-reverse',
      marginBottom: -dialRadius,
      paddingBottom: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="down" */
  directionDown: {
    flexDirection: 'column',
    '& $actions': {
      flexDirection: 'column',
      marginTop: -dialRadius,
      paddingTop: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="left" */
  directionLeft: {
    flexDirection: 'row-reverse',
    '& $actions': {
      flexDirection: 'row-reverse',
      marginRight: -dialRadius,
      paddingRight: spacingActions + dialRadius,
    },
    '& $actions2': {
      flexDirection: 'row',
      marginLeft: -dialRadius,
      paddingLeft: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="right" */
  directionRight: {
    flexDirection: 'row',
    '& $actions': {
      flexDirection: 'row',
      marginLeft: -dialRadius,
      paddingLeft: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    pointerEvents: 'auto',
  },
  actions2: {
    display: 'flex',
    pointerEvents: 'auto',
  },
  /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none',
  },
}));

export const SpeedDial = React.forwardRef(function SpeedDial(props, ref) {
  const {
    ariaLabel,
    FabProps: { ref: origDialButtonRef = null, ...FabProps } = {},
    children: childrenProp,
    children2: children2Prop,
    className,
    direction = 'up',
    hidden = false,
    icon,
    onBlur,
    onClose,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onOpen,
    open,
    openIcon,
    TransitionComponent = Zoom,
    transitionDuration = {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
    TransitionProps,
    ...other
  } = props;

  const styles = useStyles();
  const classes = { ...styles, ...(props.classes ? props.classes : {}) };

  const eventTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(eventTimer.current);
    };
  }, []);

  /**
   * an index in actions.current
   */
  const focusedAction = React.useRef(0);

  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */
  const nextItemArrowKey = React.useRef();

  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */
  const actions = React.useRef([]);
  actions.current = [actions.current[0]];

  const handleOwnFabRef = React.useCallback(fabFef => {
    actions.current[0] = fabFef;
  }, []);
  const handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);

  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */
  const createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef) => {
    return buttonRef => {
      actions.current[dialActionIndex + 1] = buttonRef;
      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const key = event.key.replace('Arrow', '').toLowerCase();
    const { current: nextItemArrowKeyCurrent = key } = nextItemArrowKey;

    if (event.key === 'Escape') {
      if (onClose) {
        actions.current[0].focus();
        onClose(event, 'escapeKeyDown');
      }
      return;
    }

    if (getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) && getOrientation(key) !== undefined) {
      event.preventDefault();

      const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1;

      // stay within array indices
      const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };

  React.useEffect(() => {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);

  const handleClose = event => {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }

    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }

    clearTimeout(eventTimer.current);

    if (onClose) {
      if (event.type === 'blur') {
        event.persist();
        eventTimer.current = setTimeout(() => {
          onClose(event, 'blur');
        });
      } else {
        onClose(event, 'mouseLeave');
      }
    }
  };

  const handleClick = event => {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }

    clearTimeout(eventTimer.current);

    if (open) {
      if (onClose) {
        onClose(event, 'toggle');
      }
    } else if (onOpen) {
      onOpen(event, 'toggle');
    }
  };

  const handleOpen = event => {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }

    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    }

    // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.
    clearTimeout(eventTimer.current);

    if (onOpen && !open) {
      event.persist();
      // Wait for a future focus or click event
      eventTimer.current = setTimeout(() => {
        const eventMap = {
          focus: 'focus',
          mouseenter: 'mouseEnter',
        };

        onOpen(event, eventMap[event.type]);
      });
    }
  };

  // Filter the label for valid id characters.
  const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

  const allItems = React.Children.toArray(childrenProp).filter(child => {
    return React.isValidElement(child);
  });

  const children = allItems.map((child, index) => {
    const { FabProps: { ref: origButtonRef = null, ...ChildFabProps } = {} } = child.props;

    return React.cloneElement(child, {
      FabProps: {
        ...ChildFabProps,
        ref: createHandleSpeedDialActionButtonRef(index, origButtonRef),
      },
      delay: 10 * (open ? index : allItems.length - index),
      open,
      id: `${id}-action-${index}`,
    });
  });

  const allItems2 = children2Prop
    ? React.Children.toArray(children2Prop).filter(child => {
        return React.isValidElement(child);
      })
    : null;

  const children2 = allItems2
    ? allItems2.map((child, index) => {
        const { FabProps: { ref: origButtonRef = null, ...ChildFabProps } = {} } = child.props;

        return React.cloneElement(child, {
          FabProps: {
            ...ChildFabProps,
            ref: createHandleSpeedDialActionButtonRef(index, origButtonRef),
          },
          delay: 10 * (open ? index : allItems.length - index),
          open,
          id: `${id}-action2-${index}`,
        });
      })
    : null;

  const curIcon = open ? openIcon || icon : icon;

  return (
    <div
      className={clsx(classes.root, classes[`direction${capitalize(direction)}`], className)}
      ref={ref}
      role="presentation"
      onKeyDown={handleKeyDown}
      onBlur={handleClose}
      onFocus={handleOpen}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      {...other}
    >
      <TransitionComponent in={!hidden} timeout={transitionDuration} unmountOnExit {...TransitionProps}>
        <Fab
          // color="primary"
          aria-label={ariaLabel}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={`${id}-actions`}
          {...FabProps}
          onClick={handleClick}
          className={clsx(classes.fab, FabProps.className)}
          ref={handleFabRef}
        >
          {React.isValidElement(curIcon) && isMuiElement(curIcon, ['SpeedDialIcon'])
            ? React.cloneElement(curIcon, { open })
            : curIcon}
        </Fab>
      </TransitionComponent>
      <div
        id={`${id}-actions`}
        role="menu"
        aria-orientation={getOrientation(direction)}
        className={clsx(classes.actions, { [classes.actionsClosed]: !open })}
      >
        {children}
      </div>
      {children2 && (
        <div
          id={`${id}-actions2`}
          role="menu"
          aria-orientation={'horizontal'}
          className={clsx(classes.actions2, { [classes.actionsClosed]: !open })}
        >
          {children2}
        </div>
      )}
    </div>
  );
});
