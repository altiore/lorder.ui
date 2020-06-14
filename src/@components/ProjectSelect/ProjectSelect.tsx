import React, { useCallback, useMemo, useState } from 'react';

import get from 'lodash/get';
import toLower from 'lodash/toLower';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import SearchIco from '@material-ui/icons/Search';

import SearchIco from '@components/@icons/Search';
import InputLight from '@components/InputLight';

import { IProject, PROJECT_TYPE } from '@types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: '#F2F3F5',
      color: '#9d9d9d',
      minWidth: theme.spacing(5),
      width: theme.spacing(5),
    },
    inputWrap: {
      padding: '15px 13px 8px 15px',
    },
    list: {
      backgroundColor: theme.palette.background.paper,
      maxHeight: 240,
      maxWidth: 360,
      overflow: 'auto',
      position: 'relative',
      width: '100%',
      ...theme.mainContent.scroll,
    },
    listGutters: {
      paddingLeft: '47px',
      paddingRight: theme.spacing(2),
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    listSubheader: {
      alignItems: 'center',
      display: 'flex',
      height: theme.spacing(2.5),
      lineHeight: '20px',
      textTransform: 'uppercase',
    },
    noMatch: {
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.pause.main,
      display: 'flex',
      height: 92,
      justifyContent: 'center',
      textAlign: 'center',
    },
    root: {
      borderRadius: 6,
      minWidth: theme.spacing(33),
      overflow: 'hidden',
      padding: theme.spacing(0, 0.25, 0.5, 0),
    },
    text: {
      fontSize: theme.typography.pxToRem(16),
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  })
);

interface IProjectSelect {
  onChange: (pId: number) => void;
  projectId?: number;
  projects: IProject[];
}

const PROJECT_TYPES = [
  {
    id: PROJECT_TYPE.SOCIALLY_USEFUL,
    title: 'Социальные',
  },
  {
    id: PROJECT_TYPE.PERSONALLY_USEFUL,
    title: 'Личные',
  },
];

const ALL_PROJECT_LIKE_A_PROJECT = { id: 0, shortName: 'Все', title: 'Все' } as IProject;

export const ProjectSelect: React.FC<IProjectSelect> = ({ onChange, projects, projectId }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const curProject: IProject = useMemo(() => {
    if (!projectId) {
      return ALL_PROJECT_LIKE_A_PROJECT;
    }
    const p = projects.find(el => el.id === projectId);
    if (!p) {
      return ALL_PROJECT_LIKE_A_PROJECT;
    }
    return p;
  }, [projectId, projects]);

  const [searchTerm, setSearchTerm] = useState('');
  const handleChangeTerm = useCallback(
    event => {
      setSearchTerm(get(event, ['currentTarget', 'value']));
    },
    [setSearchTerm]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter(el => ~toLower(el.title).search(toLower(searchTerm)));
  }, [projects, searchTerm]);

  const personalProjects = useMemo(() => {
    return filteredProjects.filter(el => el.type === PROJECT_TYPE.PERSONALLY_USEFUL);
  }, [filteredProjects]);

  const sociallyProjects = useMemo(() => {
    return filteredProjects.filter(el => el.type === PROJECT_TYPE.SOCIALLY_USEFUL);
  }, [filteredProjects]);

  const preparedProjects = useMemo(
    () => ({
      [PROJECT_TYPE.SOCIALLY_USEFUL]: sociallyProjects,
      [PROJECT_TYPE.PERSONALLY_USEFUL]: personalProjects,
    }),
    [personalProjects, sociallyProjects]
  );

  const handleSelectProject = useCallback(
    event => {
      if (onChange) {
        const pId = parseInt(get(event, ['currentTarget', 'dataset', 'id']), 0);
        if (typeof pId === 'number') {
          onChange(pId);
        }
      }
      handleClose();
    },
    [handleClose, onChange]
  );

  const { button, inputWrap, list, listGutters, listSection, listSubheader, noMatch, root, text, ul } = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'project-select-popover' : undefined;
  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="default" onClick={handleClick} className={button}>
        {curProject.shortName}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ className: root }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <div className={inputWrap}>
          <InputLight
            autoFocus
            icon={<SearchIco />}
            onChange={handleChangeTerm}
            placeholder="Найти проект..."
            value={searchTerm}
          />
        </div>
        {filteredProjects.length ? (
          <List dense className={list} subheader={<li />}>
            <ListItem data-id={0} onClick={handleSelectProject} button key={`item-all`}>
              <Typography className={text}>
                <b>Все</b>
              </Typography>
            </ListItem>
            {PROJECT_TYPES.map(({ id: prTypeId, title }) => {
              return preparedProjects[prTypeId].length ? (
                <li key={prTypeId} className={listSection}>
                  <ul className={ul}>
                    <ListSubheader className={listSubheader}>{title}</ListSubheader>
                    {preparedProjects[prTypeId].map(({ id: localProjectId, title: localTitle }) => (
                      <ListItem
                        data-id={localProjectId}
                        onClick={handleSelectProject}
                        classes={{ gutters: listGutters }}
                        button
                        key={`item-${prTypeId}-${localProjectId}`}
                      >
                        <Typography className={text}>{localTitle}</Typography>
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ) : null;
            })}
          </List>
        ) : (
          <Typography className={noMatch}>Нет совпадений</Typography>
        )}
      </Popover>
    </div>
  );
};
