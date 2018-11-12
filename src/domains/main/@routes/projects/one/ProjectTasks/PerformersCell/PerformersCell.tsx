import * as React from 'react';
import Select from 'react-select';
import { Props } from 'react-select/lib/Select';

import { IUser } from 'src/store/users/index';

export interface IPerformersCellProps extends Props<IUser> {
  classes: any;
  patchProjectTask: any;
  taskId: number;
  projectMembers: IUser[];
}

export class PerformersCellJsx extends React.Component<IPerformersCellProps, {}> {
  public render() {
    const { classes, projectMembers, ...rest } = this.props;
    return (
      <Select
        className={classes.root}
        isMulti
        getOptionLabel={this.getLabel}
        getOptionValue={this.getValue}
        onChange={this.handleChange}
        options={projectMembers}
        {...rest}
      />
    );
  }

  private handleChange = (selectedUsers: IUser[]) => {
    this.props.patchProjectTask(selectedUsers);
  };

  private getLabel = (member: IUser) => member.email;
  private getValue = (member: any) => member.id;
}
