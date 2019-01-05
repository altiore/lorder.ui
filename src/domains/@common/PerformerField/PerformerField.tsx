import Button from '@material-ui/core/Button';
import * as React from 'react';
import * as Popover from 'react-popover';
import { WrappedFieldProps } from 'redux-form';

import { ListBox } from 'liw-components/ListBox';

import { IUser } from 'src/store/users';

interface IPerformerFieldState {
  isOpen: boolean;
}

export interface IPerformerFieldProps extends WrappedFieldProps {
  classes: any;
  patchProjectTask: any;
  taskId: number;
  projectMembers: IUser[];
}

export class PerformerFieldTsx extends React.Component<IPerformerFieldProps, IPerformerFieldState> {
  state = {
    isOpen: false,
  };

  render() {
    const { projectMembers, input, ...rest } = this.props;
    const { isOpen } = this.state;

    return (
      <Popover
        preferPlace="below"
        isOpen={isOpen}
        onOuterAction={this.handleOnClick}
        body={
          <ListBox
            isMulti
            items={projectMembers}
            showFilter
            onClose={this.handleOnClick}
            getItemLabel={this.getLabel}
            filterItem={this.filterItem}
            findItemIndex={this.findItemIndex}
            input={{
              ...input,
              onChange: this.handleChange,
            }}
            label={'Исполнители'}
            {...rest}
          />
        }
      >
        <Button onClick={this.handleOnClick}>{input.value.length || '0'}</Button>
      </Popover>
    );
  }

  private handleOnClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  private handleChange = (selectedUsers: any) => {
    this.props.patchProjectTask(selectedUsers);
  };

  private filterItem(filterKw: string, item: any) {
    return item.email.toLowerCase().indexOf(filterKw.toLowerCase()) === 0;
  }

  private findItemIndex(item: IUser, members: IUser[]) {
    return members.findIndex(el => el.id === item.id);
  }

  private getLabel = (member: IUser) => member.email;
}
