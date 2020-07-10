import React, { useCallback, useMemo } from 'react';

import cn from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

import { useStyles } from './styles';

export interface IAvatarProps {
  children?: string | number;
  isSelected?: boolean;
  onClick?: (e: React.SyntheticEvent) => any;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  value?: any;
}

export const AvatarTsx: React.FC<IAvatarProps> = React.forwardRef<any, IAvatarProps>(
  ({ children, isSelected, onClick, size = 'md', src, value, ...rest }, ref) => {
    const classes = useStyles();

    const avatarData = useMemo<string>(() => (children || '- -').toString(), [children]);

    const handleClick = useCallback(
      e => {
        if (onClick) {
          e.persist();
          e.target.value = value;
          if (value) {
            onClick(e);
          } else {
            onClick(e);
          }
        }
      },
      [onClick, value]
    );

    return (
      <div
        {...rest}
        className={cn(classes.avatarBorder, {
          [classes.avatarSelected]: isSelected,
          [classes.avatarBorderSmall]: size === 'sm',
        })}
      >
        <ButtonBase ref={ref} className={classes.avatarWrapper} onClick={handleClick}>
          <Avatar
            className={cn(classes.avatar, {
              [classes.avatarSmall]: size === 'sm',
            })}
            alt={avatarData}
            src={src}
          >
            {avatarData.substr(0, 2).toUpperCase()}
          </Avatar>
        </ButtonBase>
      </div>
    );
  }
);
