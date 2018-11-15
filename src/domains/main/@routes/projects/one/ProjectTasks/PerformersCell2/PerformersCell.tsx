import Button from '@material-ui/core/Button';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { ListBox } from 'liw-components/ListBox';

import { IUser } from 'src/store/users';

interface IPerformersState {
  isOpen: boolean;
}

export interface IPerformersCellProps extends WrappedFieldProps {
  classes: any;
  patchProjectTask: any;
  taskId: number;
  projectMembers: IUser[];
}

export class PerformersCellJsx extends React.Component<IPerformersCellProps, IPerformersState> {
  public state = {
    isOpen: false,
  };

  public render() {
    const { projectMembers, input, ...rest } = this.props;
    const { isOpen } = this.state;
    if (isOpen) {
      return (
        <ListBox
          isMulti
          items={projectMembers}
          showFilter
          getItemLabel={this.getLabel}
          input={{ ...input, onChange: this.handleChange }}
          label={'Исполнители'}
          // getOptionLabel={this.getLabel}
          // getOptionValue={this.getValue}
          // onChange={this.handleChange}
          // options={projectMembers}
          {...rest}
        />
      );
    }
    return <Button onClick={this.handleOnClick}>Члены</Button>;
  }

  private handleOnClick = () => this.setState({ isOpen: true });

  private handleChange = (selectedUsers: any) => {
    this.props.patchProjectTask(selectedUsers);
  };

  private getLabel = (member: IUser) => member.email;
  // private getValue = (member: any) => member.id;
}
