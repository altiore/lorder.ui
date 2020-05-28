import React, { useCallback, useMemo, useState } from 'react';

import get from 'lodash/get';
import toLower from 'lodash/toLower';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchIco from '@material-ui/icons/Search';

import Input from '@components/Input';

import { IProject, PROJECT_TYPE } from '@types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: '#F5F5F5',
      color: '#292929',
      minWidth: theme.spacing(5),
      width: theme.spacing(5),
    },
    inputWrap: {
      padding: theme.spacing(1),
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
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(2),
    },
    listSection: {
      backgroundColor: 'inherit',
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
      minWidth: theme.spacing(26),
      padding: theme.spacing(0, 0.25, 1, 0),
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
    id: PROJECT_TYPE.PERSONALLY_USEFUL,
    title: 'Личные',
  },
  {
    id: PROJECT_TYPE.SOCIALLY_USEFUL,
    title: 'Социальные',
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

  const { button, inputWrap, list, listGutters, listSection, noMatch, root, ul } = useStyles();

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
          <Input value={searchTerm} onChange={handleChangeTerm} icon={<SearchIco />} autoFocus />
        </div>
        {filteredProjects.length ? (
          <List dense className={list} subheader={<li />}>
            {PROJECT_TYPES.map(({ id, title }) => {
              return preparedProjects[id].length ? (
                <li key={id} className={listSection}>
                  <ul className={ul}>
                    <ListSubheader>{title}</ListSubheader>
                    {preparedProjects[id].map(({ id: projectId, title }) => (
                      <ListItem
                        data-id={projectId}
                        onClick={handleSelectProject}
                        classes={{ gutters: listGutters }}
                        button
                        key={`item-${id}-${projectId}`}
                      >
                        <ListItemText primary={title} />
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
