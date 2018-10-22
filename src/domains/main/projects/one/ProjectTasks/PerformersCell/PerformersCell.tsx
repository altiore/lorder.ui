import * as React from 'react';
import Select from 'react-select';
import { Props } from 'react-select/lib/Select';

import { User } from 'src/store/users';

export interface IPerformersCellProps extends Props<User> {
  classes: any;
  patchProjectTask: any;
  taskId: number;
  userList: User[];
}

export class PerformersCellJsx extends React.Component<IPerformersCellProps, {}> {
  public render() {
    const { classes, userList, ...rest } = this.props;
    return (
      <Select
        className={classes.root}
        isMulti
        getOptionLabel={this.getLabel}
        getOptionValue={this.getValue}
        onChange={this.handleChange}
        options={userList}
        {...rest}
      />
    );
  }

  private handleChange = (selectedUsers: User[]) => {
    this.props.patchProjectTask(selectedUsers);
  };

  private getLabel = (user: any) => user.email;
  private getValue = (user: any) => user.id;
}
