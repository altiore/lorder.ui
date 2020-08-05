import React, { useMemo } from 'react';

import cn from 'classnames';

import { Button, ButtonProps, Typography } from '@material-ui/core';

import SettingsIcon from '@components/@icons/Settings';

import { LinkButton } from '#/@common/link-button';

import { useStyles } from './styles';

interface IProps extends ButtonProps {
  children: string;
  routePath?: string;
}

export const ButtonEdit: React.FC<IProps> = ({ children, routePath, variant, ...rest }) => {
  const { editButton, editButtonText, editButtonTextGray, settingsIcon, settingsIconGray } = useStyles();
  const BaseComponent: any = useMemo(() => (routePath ? LinkButton : Button), [routePath]);

  return (
    <BaseComponent {...rest} className={editButton}>
      <SettingsIcon className={cn(settingsIcon, { [settingsIconGray]: variant === 'contained' })} />
      <Typography className={cn(editButtonText, { [editButtonTextGray]: variant === 'contained' })}>
        {children}
      </Typography>
    </BaseComponent>
  );
};
