import React from 'react';

import cn from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

export interface IAvatarProps {
  classes: any;
  children?: string | number;
  isSelected?: boolean;
  onClick?: (e: React.SyntheticEvent) => any;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
}

export class AvatarTsx extends React.Component<IAvatarProps, {}> {
  render() {
    const { classes, isSelected, children, onClick, size = 'md', src, ...rest } = this.props;
    const avatarData: string = (children || '- -').toString();

    return (
      <div
        {...rest}
        className={cn(classes.avatarBorder, {
          [classes.avatarSelected]: isSelected,
        })}
        onClick={isSelected ? onClick : undefined}
      >
        <ButtonBase className={classes.avatarWrapper} onClick={isSelected ? undefined : onClick}>
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
}
