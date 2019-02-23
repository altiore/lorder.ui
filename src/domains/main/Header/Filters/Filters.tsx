import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import * as cn from 'classnames';
import * as React from 'react';

import { IUser } from 'src/@types';

export interface IFiltersProps {
  changeFilter: any;
  classes: any;
  filteredMembers: number[];
  isBoardFilterOpened: boolean;
  members: IUser[];
  searchTerm: string;
  toggleMember: any;
  toggleUiSetting: any;
}

// export interface IFiltersState {}

export class FiltersTsx extends React.Component<IFiltersProps, {}> {
  render() {
    const { classes, filteredMembers, isBoardFilterOpened, members, searchTerm } = this.props;
    const isFiltered = !!(filteredMembers.length || searchTerm);

    return (
      <div className={cn(classes.root, { [classes.rootOpen]: isBoardFilterOpened })}>
        {isBoardFilterOpened ? (
          <>
            <div className={classes.members}>
              {members.map(member => {
                const isSelected = !!~filteredMembers.indexOf(member.id as number);
                return (
                  <Tooltip key={member.id} title={member.email}>
                    <div
                      className={cn(classes.avatarBorder, {
                        [classes.avatarSelected]: isSelected,
                      })}
                      onClick={isSelected ? this.handleToggleMember(member.id as number) : undefined}
                    >
                      <ButtonBase
                        className={classes.avatarWrapper}
                        onClick={this.handleToggleMember(member.id as number)}
                      >
                        <Avatar className={classes.avatar} alt={member.email} src={member.avatar}>
                          {member.email.substr(0, 2).toUpperCase()}
                        </Avatar>
                      </ButtonBase>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
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
                onChange={this.handleChangeFilter('search')}
              />
              <Tooltip title="Начните вводить заголовок или выберите участника, чтоб отфильтровать задачи">
                <IconButton className={classes.iconButton} aria-label="Поиск">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Divider className={classes.divider} />
              <Tooltip title="Закрыть фильтр">
                <IconButton
                  onClick={this.toggleOpen(true)}
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
          <Tooltip title={`Открыть фильтр задач`}>
            <IconButton color="secondary" onClick={this.toggleOpen()}>
              <Badge classes={{ badge: classes.filterBadge }} badgeContent={isFiltered ? '!' : ''}>
                <FilterIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }

  private handleChangeFilter = (filter: string) => (e: React.ChangeEvent<{ value: any }>) => {
    this.props.changeFilter(filter, e.target.value);
  };

  private handleToggleMember = (memberId: number) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.props.toggleMember(memberId);
  };

  private toggleOpen = (nextIsClose = false) => () => {
    if (nextIsClose) {
      this.props.changeFilter('search', '');
      this.props.changeFilter('members', []);
    }
    this.props.toggleUiSetting('isBoardFilterOpened');
  };
}
