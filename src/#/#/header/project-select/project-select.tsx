import React, { useCallback, useMemo, useState } from 'react';

import get from 'lodash/get';
import toLower from 'lodash/toLower';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SearchIco from '@components/@icons/Search';
import InputLight from '@components/input-light';

import { ProjectItem } from './project-item/project-item';

import { IProject, PROJECT_TYPE } from '@types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '& > span > div': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
      },
      '& > span > div:first-child': {
        height: 8,
        marginRight: 4,
        width: 8,
      },
      '& > span > div:nth-child(2)': {
        height: 6,
        marginRight: 4,
        width: 6,
      },
      '& > span > div:nth-child(3)': {
        height: 4,
        width: 4,
      },
      height: 38,
      marginLeft: 8,
      minWidth: 42,
    },
    inputWrap: {
      padding: '15px 11px 11px 15px',
    },
    list: {
      backgroundColor: 'transparent',
      color: '#9A9A9B',
      maxHeight: 300,
      maxWidth: 360,
      paddingRight: 4,
      position: 'relative',
      width: '100%',
      ...theme.scroll.secondary,
      overflowY: 'scroll',
    },
    listSection: {
      '&:nth-child(3)': {
        marginTop: 4,
      },
      backgroundColor: 'inherit',
    },
    listSubheader: {
      alignItems: 'center',
      backgroundColor: '#37373B',
      color: '#dadadb',
      display: 'flex',
      height: theme.spacing(4),
      lineHeight: '20px',
      marginBottom: 2,
      textTransform: 'uppercase',
    },
    noMatch: {
      alignItems: 'center',
      backgroundColor: 'rgb(61, 61, 63)',
      color: '#dadadb',
      display: 'flex',
      height: 94,
      justifyContent: 'center',
      marginRight: 10,
      textAlign: 'center',
    },
    root: {
      backgroundColor: theme.palette.default.main,
      borderRadius: 6,
      minWidth: theme.spacing(33),
      overflow: 'hidden',
      padding: theme.spacing(0, 0.5, 0.5, 0),
      width: 319,
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  })
);

interface IProjectSelect {
  openProject: (pId: IProject) => Promise<void>;
  // openTaskModal: any;
  push: any;
  // showSuccess: any;
  // startUserWork: any;
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

export const ProjectSelect: React.FC<IProjectSelect> = ({
  projects,
  openProject,
  // openTaskModal,
  push,
  // showSuccess,
  // startUserWork,
}) => {
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
      event.stopPropagation();
      if (openProject) {
        const pId = parseInt(get(event, ['currentTarget', 'dataset', 'id']), 0);
        if (typeof pId === 'number') {
          const project = projects.find(el => el.id === pId);
          if (project) {
            openProject(project);
          }
        }
      }
      handleClose();
    },
    [handleClose, openProject, projects]
  );

  const handleCreateTask = useCallback(
    event => {
      const projectId = parseInt(get(event, ['currentTarget', 'dataset', 'id']), 0);
      if (projectId) {
        // TODO: добавить функционал создания задачи
        alert('TODO: добавить функционал создания задачи');
        // startUserWork({ projectId });
        // const project = projects.find(el => el.id === projectId);
        // if (project) {
        //   showSuccess({
        //     action: {
        //       callback: openTaskModal,
        //       label: 'Редактировать',
        //     },
        //     message: 'Хотите редактировать созданную задачу?',
        //     title: `Задача для проекта "${project.title}" успешно создана!`,
        //   });
        // }
      }
      handleClose();
    },
    [handleClose /*, openTaskModal, projects, showSuccess, startUserWork*/]
  );

  const openProjectStatistic = useCallback(
    event => {
      const prUuid = get(event, ['currentTarget', 'dataset', 'uuid']);
      if (prUuid) {
        push(`/p/${prUuid}`);
      }
      handleClose();
    },
    [handleClose, push]
  );

  const { button, inputWrap, list, listSection, listSubheader, noMatch, root, ul } = useStyles();

  const open = Boolean(anchorEl);
  const elId = open ? 'project-select-header-popover' : undefined;
  return (
    <>
      <Button aria-describedby={elId} variant="text" color="secondary" onClick={handleClick} className={button}>
        <div />
        <div />
        <div />
      </Button>
      <Popover
        id={elId}
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
            dark
            icon={<SearchIco />}
            onChange={handleChangeTerm}
            placeholder="Найти проект..."
            value={searchTerm}
          />
        </div>
        {filteredProjects.length ? (
          <List className={list} subheader={<li />}>
            {PROJECT_TYPES.map(({ id, title }) => {
              return preparedProjects[id].length ? (
                <li key={id} className={listSection}>
                  <ul className={ul}>
                    <ListSubheader className={listSubheader}>{title}</ListSubheader>
                    {preparedProjects[id].map(project => (
                      <ProjectItem
                        id={id}
                        key={`${id}-${project.id}`}
                        project={project}
                        onCreateTask={handleCreateTask}
                        onSelect={handleSelectProject}
                        onStatistic={openProjectStatistic}
                      />
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
    </>
  );
};
