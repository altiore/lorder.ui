import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import cn from 'classnames';
import get from 'lodash/get';
import intersection from 'lodash/intersection';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Avatar from '@components/avatar';
import SelectTree from '@components/select-tree';

import AssigneeList from '#/@common/task-form/status-field/assignee-list';

import RolesFilter from './roles-filter';
import { useStyles } from './styles';

import { IProjectPart, IUser } from '@types';

interface IFiltersProps extends RouteComponentProps<{ projectId: string }> {
  changeFilter: any;
  fetchProjectParts: any;
  filteredMembers: number[];
  isBoardFilterOpened: boolean;
  members: IUser[];
  searchTerm: string;
  toggleMember: any;
  toggleUiSetting: any;
  getProjectParts: (pId: number) => IProjectPart[];
  selectedParts: number[];
}

const SHOWN_MEMBERS = 7;

export const FiltersTsx: React.FC<IFiltersProps> = ({
  changeFilter,
  fetchProjectParts,
  filteredMembers,
  isBoardFilterOpened,
  getProjectParts,
  match,
  members,
  searchTerm,
  selectedParts,
  toggleMember,
  toggleUiSetting,
}) => {
  const projectId = useMemo(() => {
    return parseInt(match?.params?.projectId, 10);
  }, [match]);

  const projectParts = useMemo(() => {
    return getProjectParts(projectId);
  }, [getProjectParts, projectId]);

  useEffect(() => {
    if (projectId && fetchProjectParts && !projectParts.length) {
      fetchProjectParts(projectId);
    }
  }, [fetchProjectParts, projectId, projectParts]);

  const firstTopMembersIds = useMemo(() => {
    return members ? members.slice(0, SHOWN_MEMBERS).map(el => el.id) : [];
  }, [members]);

  const sortedMembers = useMemo(() => {
    return members.slice(0).sort((a: IUser, b: IUser) => {
      if (filteredMembers.indexOf(a.id || 0) === -1) {
        if (filteredMembers.indexOf(b.id || 0) === -1) {
          return 0;
        } else {
          return intersection(firstTopMembersIds, filteredMembers).length === filteredMembers.length ? 0 : 1;
        }
      } else {
        if (filteredMembers.indexOf(b.id || 0) === -1) {
          return intersection(firstTopMembersIds, filteredMembers).length === filteredMembers.length ? 0 : -1;
        } else {
          return 0;
        }
      }
    });
  }, [filteredMembers, firstTopMembersIds, members]);

  const shownMembers = useMemo(() => {
    return sortedMembers ? sortedMembers.slice(0, SHOWN_MEMBERS) : [];
  }, [sortedMembers]);

  const dropDownMembers = useMemo(() => {
    return sortedMembers ? sortedMembers.slice(SHOWN_MEMBERS) : [];
  }, [sortedMembers]);

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const toggleDropDownOpen = useCallback(
    e => {
      e.stopPropagation();
      setOpen(o => !o);
    },
    [setOpen]
  );

  const closeDropDownOpen = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<{ value: any }>) => {
      changeFilter('search', e.target.value);
    },
    [changeFilter]
  );

  const handleToggleMember = useCallback(
    event => {
      event.stopPropagation();
      toggleMember(event.target.value);
    },
    [toggleMember]
  );

  const handleOpen = useCallback(() => {
    changeFilter('search', '');
    changeFilter('members', []);
    changeFilter('projectParts', []);
    toggleUiSetting('isBoardFilterOpened');
  }, [changeFilter, toggleUiSetting]);

  const handleClose = useCallback(() => {
    toggleUiSetting('isBoardFilterOpened');
  }, [toggleUiSetting]);

  const handleChangeParts = useCallback(
    values => {
      changeFilter('projectParts', values);
    },
    [changeFilter]
  );

  const isFiltered = useMemo(() => !!((filteredMembers && filteredMembers.length) || searchTerm), [
    filteredMembers,
    searchTerm,
  ]);

  const {
    divider,
    filterBadge,
    input,
    iconButton,
    membersStyle,
    moreBtn,
    popper,
    root,
    rootOpen,
    search,
  } = useStyles();
  return (
    <div className={cn(root, { [rootOpen]: isBoardFilterOpened })}>
      {isBoardFilterOpened ? (
        <>
          {Boolean(projectParts && projectParts.length) && (
            <SelectTree value={selectedParts} items={projectParts} onChange={handleChangeParts} multiple />
          )}
          {Boolean(shownMembers && shownMembers.length) && (
            <div className={membersStyle}>
              {shownMembers.map(member => {
                const isSelected = !!~filteredMembers.indexOf(member.id as number);
                return (
                  <Tooltip key={member.id} title={get(member, 'userName', (member.email || '').replace(/@.*$/, ''))}>
                    <Avatar
                      value={member.id}
                      isSelected={isSelected}
                      onClick={handleToggleMember}
                      src={get(member, ['avatar', 'url'])}
                    >
                      {member.email}
                    </Avatar>
                  </Tooltip>
                );
              })}
            </div>
          )}
          {dropDownMembers.length && (
            <ClickAwayListener onClickAway={closeDropDownOpen}>
              <div ref={anchorRef}>
                <Button className={moreBtn} variant="outlined" color="secondary" onClick={toggleDropDownOpen}>
                  Еще...
                </Button>

                <Popper open={open} anchorEl={anchorRef.current} transition className={popper}>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <div id="members-drop-down-list">
                        <AssigneeList assignees={dropDownMembers} onItemClick={handleToggleMember} />
                      </div>
                    </Grow>
                  )}
                </Popper>
              </div>
            </ClickAwayListener>
          )}
          <Paper className={search} elevation={1}>
            <Tooltip
              title="Поиск только по заголовку задачи. В будущем здесь появится возможность настроить поиск
               по описанию и даже по комментариям внутри задачи"
            >
              <IconButton className={iconButton} aria-label="Настройки">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <InputBase
              className={input}
              placeholder="Заголовок задачи..."
              value={searchTerm}
              onChange={handleChangeSearch}
            />
            <Tooltip title="Начните вводить заголовок или выберите участника, чтоб отфильтровать задачи">
              <IconButton className={iconButton} aria-label="Поиск">
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Divider className={divider} />
            <Tooltip title="Закрыть фильтр">
              <IconButton onClick={handleOpen} color="primary" className={iconButton} aria-label="Закрыть фильтр">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </>
      ) : (
        <>
          <RolesFilter />
          <Tooltip title={`Открыть фильтр задач`}>
            <IconButton color="secondary" onClick={handleClose}>
              <Badge classes={{ badge: filterBadge }} badgeContent={isFiltered ? '!' : ''}>
                <FilterIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};
