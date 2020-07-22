import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames';
import get from 'lodash/get';
import intersection from 'lodash/intersection';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Avatar from '@components/Avatar';

import AssigneeList from '#/@common/TaskForm/StatusField/AssigneeList';

import RolesFilter from './RolesFilter';

import { IProjectPart, IProjectRole, IUser } from '@types';

interface IFiltersProps {
  changeFilter: any;
  classes: any;
  fetchProjectParts: any;
  filteredMembers: number[];
  isBoardFilterOpened: boolean;
  members: IUser[];
  rolesList: IProjectRole[];
  searchTerm: string;
  toggleMember: any;
  toggleProjectPart: any;
  toggleUiSetting: any;
  projectPart: string | number;
  projectParts: IProjectPart[];
  openedProjectUserRoles: any;
}

const SHOWN_MEMBERS = 7;

export const FiltersTsx: React.FC<IFiltersProps> = ({
  changeFilter,
  classes,
  fetchProjectParts,
  filteredMembers,
  isBoardFilterOpened,
  members,
  searchTerm,
  projectPart,
  projectParts,
  rolesList,
  toggleMember,
  toggleProjectPart,
  toggleUiSetting,
  openedProjectUserRoles,
}) => {
  const [select, setSelect] = useState('default');
  useEffect(() => {
    if (fetchProjectParts) {
      fetchProjectParts();
    }
  }, [fetchProjectParts]);

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

  const handleChangeFilter = (filter: string) => (e: React.ChangeEvent<{ value: any }>) => {
    changeFilter(filter, e.target.value);
  };

  const handleToggleMember = useCallback(
    event => {
      event.stopPropagation();
      toggleMember(event.target.value);
    },
    [toggleMember]
  );

  const toggleOpen = (nextIsClose = false) => () => {
    if (nextIsClose) {
      changeFilter('search', '');
      changeFilter('members', []);
      changeFilter('projectPart', '');
      setSelect('default');
    }
    toggleUiSetting('isBoardFilterOpened');
  };

  const isFiltered = !!((filteredMembers && filteredMembers.length) || searchTerm);

  const handleSelectProjectPart = ({ target: { value } }) => {
    if (value === 'clear') {
      changeFilter('projectPart', '');
      setSelect('default');
      return;
    }
    toggleProjectPart(value);
    setSelect(value);
  };
  return (
    <div className={cn(classes.root, { [classes.rootOpen]: isBoardFilterOpened })}>
      {isBoardFilterOpened ? (
        <>
          {Boolean(projectParts && projectParts.length) && (
            <FormControl className={classes.formControl}>
              <Select
                value={select}
                onChange={handleSelectProjectPart}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="default" disabled>
                  По частям
                </MenuItem>
                <MenuItem value={0}>Без частей</MenuItem>
                {projectParts.map(({ title, id }) => {
                  return (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  );
                })}
                {typeof projectPart === 'number' && (
                  <MenuItem value="clear">
                    <b>Все</b>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          )}
          {Boolean(shownMembers && shownMembers.length) && (
            <div className={classes.members}>
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
                <Button className={classes.moreBtn} variant="outlined" color="secondary" onClick={toggleDropDownOpen}>
                  Еще...
                </Button>

                <Popper open={open} anchorEl={anchorRef.current} transition className={classes.popper}>
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
          <Paper className={classes.search} elevation={1}>
            <Tooltip
              title="Поиск только по заголовку задачи. В будущем здесь появится возможность настроить поиск
               по описанию и даже по комментариям внутри задачи"
            >
              <IconButton className={classes.iconButton} aria-label="Настройки">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <InputBase
              className={classes.input}
              placeholder="Заголовок задачи..."
              value={searchTerm}
              onChange={handleChangeFilter('search')}
            />
            <Tooltip title="Начните вводить заголовок или выберите участника, чтоб отфильтровать задачи">
              <IconButton className={classes.iconButton} aria-label="Поиск">
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Divider className={classes.divider} />
            <Tooltip title="Закрыть фильтр">
              <IconButton
                onClick={toggleOpen(true)}
                color="primary"
                className={classes.iconButton}
                aria-label="Закрыть фильтр"
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </>
      ) : (
        <>
          <RolesFilter projectRoles={openedProjectUserRoles} roles={rolesList} />
          <Tooltip title={`Открыть фильтр задач`}>
            <IconButton color="secondary" onClick={toggleOpen()}>
              <Badge classes={{ badge: classes.filterBadge }} badgeContent={isFiltered ? '!' : ''}>
                <FilterIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};
