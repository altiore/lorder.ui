import React, { useMemo } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TooltipBig from '@components/tooltip-big';

import CreateTask from './icons/create-task';
import OpenProject from './icons/open-project';
import OpenPublicProject from './icons/open-public-project';
import PowerKey from './icons/power-key';
import SimpleKey from './icons/simple-key';

import { ACCESS_LEVEL, IProject } from '@types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconWrap: {
      '&:hover, &:focus': {
        backgroundColor: theme.palette.default.main,
        boxShadow: theme.shadow.default,
      },
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      marginRight: 4,
      opacity: 0,
      padding: theme.spacing(0.75, 1.25),
    },
    itemIcons: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around',
    },
    keyIndicator: {
      borderRadius: '50%',
      height: 6,
      width: 6,
    },
    keyIndicatorColor: (accessLevel: ACCESS_LEVEL) => ({
      backgroundColor: theme.palette.access[accessLevel].main,
    }),
    keyIndicatorWrap: {
      '& > div': {
        position: 'absolute',
      },
      '& > svg': {
        fontSize: 1,
        position: 'absolute',
        transition: theme.transitions.create(['font-size']),
      },
      alignItems: 'center',
      display: 'flex',
      height: 44,
      justifyContent: 'center',
      position: 'relative',
      width: 34,
    },
    keyIndicatorWrapColor: (accessLevel: ACCESS_LEVEL) => ({
      color: theme.palette.access[accessLevel].main,
    }),
    listItem: {
      '&:hover, &:focus-within': {
        '& $iconWrap': {
          opacity: 1,
        },
        '& $keyIndicatorWrap': {
          '& > svg': {
            fontSize: 22,
          },
        },
        '& $text': {
          overflow: 'hidden',
        },
        backgroundColor: '#37373B',
        boxShadow: theme.shadows[2],
        color: theme.palette.secondary.main,
      },
      overflow: 'hidden',
      padding: theme.spacing(0, 1, 0, 0),
    },
    openProjectBtn: {
      '& $iconWrap': {
        marginLeft: 8,
      },
      '&:hover, &:focus': {
        '& $iconWrap': {
          backgroundColor: theme.palette.default.main,
          boxShadow: theme.shadow.default,
        },
      },
      justifyContent: 'space-between',
      paddingBottom: 4,
      paddingLeft: 14,
      paddingTop: 4,
      width: 200,
    },
    text: {
      display: 'block',
      fontSize: theme.typography.pxToRem(16),
      maxWidth: 96,
      whiteSpace: 'nowrap',
    },
    titleStyle: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
    },
  })
);

interface IProjectItem {
  id: string;
  project: IProject;
  onCreateTask: any;
  onSelect: any;
  onStatistic: any;
}

export const ProjectItem: React.FC<IProjectItem> = ({ id, project, onCreateTask, onSelect, onStatistic }) => {
  const { accessLevel, id: projectId, title, uuid } = project;

  const level: ACCESS_LEVEL = useMemo(() => {
    return accessLevel || ACCESS_LEVEL.WHITE;
  }, [accessLevel]);

  const {
    iconWrap,
    itemIcons,
    keyIndicator,
    keyIndicatorColor,
    keyIndicatorWrap,
    keyIndicatorWrapColor,
    listItem,
    openProjectBtn,
    titleStyle,
    text,
  } = useStyles(level);

  return (
    <ListItem data-id={projectId} disableGutters classes={{ root: listItem }} key={`item-${id}-${projectId}`}>
      <ButtonBase data-id={projectId} tabIndex={-1} className={openProjectBtn} onClick={onSelect}>
        <div className={titleStyle}>
          <div className={[keyIndicatorWrap, keyIndicatorWrapColor].join(' ')}>
            <div className={[keyIndicator, keyIndicatorColor].join(' ')} />
            {level > 4 ? <PowerKey /> : <SimpleKey />}
          </div>
          <Typography className={text}>{title}</Typography>
        </div>
        <TooltipBig title="Открыть проект" placement="top">
          <ButtonBase data-id={projectId} onClick={onSelect} component="span" className={iconWrap}>
            <OpenProject />
          </ButtonBase>
        </TooltipBig>
      </ButtonBase>
      <div className={itemIcons}>
        <TooltipBig title="Создать задачу" placement="top">
          <ButtonBase data-id={projectId} className={iconWrap} onClick={onCreateTask}>
            <CreateTask />
          </ButtonBase>
        </TooltipBig>
        {uuid && (
          <TooltipBig title="Статистика" placement="top">
            <ButtonBase data-uuid={uuid} className={iconWrap} onClick={onStatistic}>
              <OpenPublicProject />
            </ButtonBase>
          </TooltipBig>
        )}
      </div>
    </ListItem>
  );
};
