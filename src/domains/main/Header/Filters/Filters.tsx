import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import * as cn from 'classnames';
import * as React from 'react';

import { IUser } from 'src/@types';

export interface IFiltersProps {
  changeFilter: any;
  classes: any;
  filteredMembers: number[];
  members: IUser[];
  searchTerm: string;
  toggleMember: any;
}

export class FiltersTsx extends React.Component<IFiltersProps> {
  render() {
    const { classes, filteredMembers, members, searchTerm } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.members}>
          {members.map(member => (
            <Tooltip key={member.id} title={member.email}>
              <ButtonBase className={classes.avatarWrapper} onClick={this.handleToggleMember(member.id as number)}>
                <div
                  className={cn(classes.avatarBorder, {
                    [classes.avatarSelected]: !!~filteredMembers.indexOf(member.id as number),
                  })}
                >
                  <Avatar className={classes.avatar} alt={member.email} src={member.avatar}>
                    {member.email.substr(0, 2).toUpperCase()}
                  </Avatar>
                </div>
              </ButtonBase>
            </Tooltip>
          ))}
        </div>
        <Paper className={classes.search} elevation={1}>
          <IconButton className={classes.iconButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Фильтровать задачи"
            value={searchTerm}
            onChange={this.handleChangeFilter('search')}
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} />
          <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </div>
    );
  }

  private handleChangeFilter = (filter: string) => (e: React.ChangeEvent<{ value: any }>) => {
    this.props.changeFilter(filter, e.target.value);
  };

  private handleToggleMember = (memberId: number) => () => {
    this.props.toggleMember(memberId);
  };
}
