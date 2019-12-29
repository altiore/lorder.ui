import Button from '@material-ui/core/Button';
import React from 'react';
import Popover from 'react-popover';
import { WrappedFieldProps } from 'redux-form';

import { IUser } from '@types';

interface IPerformersState {
  isOpen: boolean;
}

export interface IPerformersCellProps extends WrappedFieldProps {
  classes: any;
  patchProjectTask: any;
  taskId: number;
  projectId: number;
  projectMembers: IUser[];
}

export class PerformersCellJsx extends React.Component<IPerformersCellProps, IPerformersState> {
  state = {
    isOpen: false,
  };

  render() {
    const { projectMembers, input, ...rest } = this.props;
    const { isOpen } = this.state;

    return (
      <Popover preferPlace="below" isOpen={isOpen} onOuterAction={this.handleOnClick} body={<div>testBox</div>}>
        <Button onClick={this.handleOnClick}>{input.value.length || '0'}</Button>
      </Popover>
    );
  }

  private handleOnClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  private handleChange = (users: any) => {
    this.props.patchProjectTask({ users, projectId: this.props.projectId, taskId: this.props.taskId });
  };

  private filterItem(filterKw: string, item: any) {
    return item.email.toLowerCase().indexOf(filterKw.toLowerCase()) === 0;
  }

  private findItemIndex(item: IUser, members: IUser[]) {
    return members.findIndex(el => el.id === item.id);
  }

  private getLabel = (member: IUser) => member.email;
}
