import React from 'react';

import classNames from 'classnames';

import { Typography } from '@material-ui/core';

import SettingsIcon from '@components/@icons/Settings';

import { LinkButton } from '#/@common/LinkButton';

import { useStyles } from './styles';

interface IButtonEditProps {
  children: string;
  routePath: string;
  variant?: 'Gray';
}

export const ButtonEdit = ({ children, routePath, variant }: IButtonEditProps) => {
  const classes = useStyles();
  return (
    <LinkButton to={routePath} className={classes.editButton}>
      <SettingsIcon
        className={variant ? classNames(classes[`settingsIcon${variant}`], classes.settingsIcon) : classes.settingsIcon}
      />
      <Typography
        className={
          variant ? classNames(classes[`editButtonText${variant}`], classes.editButtonText) : classes.editButtonText
        }
      >
        {children}
      </Typography>
    </LinkButton>
  );
};
