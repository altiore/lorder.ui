import React, { useCallback, useMemo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

export interface IAvatarProps {
  children?: string | number;
  isSelected?: boolean;
  onClick?: (e: React.SyntheticEvent) => any;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  value?: any;
  className: string;
}

export const AvatarClickableTsx: React.FC<IAvatarProps> = React.forwardRef<any, IAvatarProps>(
  ({ className, children, isSelected, onClick, size = 'md', src, value, ...rest }, ref) => {
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
      <div {...rest}>
        <ButtonBase component={onClick ? 'button' : 'div'} ref={ref} onClick={handleClick}>
          <Avatar className={className} alt={avatarData} src={src}>
            {avatarData.substr(0, 2).toUpperCase()}
          </Avatar>
        </ButtonBase>
      </div>
    );
  }
);
