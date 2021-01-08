import React, { useCallback, useMemo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

export interface IAvatarProps {
  onClick?: (e: React.SyntheticEvent) => any;
  src?: string;
  value?: any;
  className: string;
}

export const AvatarClickableTsx: React.FC<IAvatarProps> = React.forwardRef<any, IAvatarProps>(
  ({ className, children, onClick, src, value }, ref) => {
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
      <>
        <ButtonBase component={onClick ? 'button' : 'div'} ref={ref} onClick={handleClick}>
          <Avatar className={className} alt={avatarData} src={src}>
            {avatarData.substr(0, 2).toUpperCase()}
          </Avatar>
        </ButtonBase>
      </>
    );
  }
);
