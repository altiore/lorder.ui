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
  children?: (count: number, onClick: () => void) => React.ReactNode;
}

export class PerformerFieldTsx extends React.Component<IPerformerFieldProps, IPerformerFieldState> {
  state = {
    isOpen: false,
  };

  render() {
    const { children, classes, projectMembers, input, ...rest } = this.props;
    const { isOpen } = this.state;
    const length = input.value.length || '0';

    return (
      <Popover
        preferPlace="below"
        isOpen={isOpen}
        onOuterAction={this.handleOnClick}
        className={classes.popover}
        enterExitTransitionDurationMs={400}
        body={
          <ListBox
            isMulti
            items={projectMembers || []}
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
        {children ? children(length, this.handleOnClick) : <Button onClick={this.handleOnClick}>{length}</Button>}
      </Popover>
    );
  }

  private handleOnClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  private handleChange = (selectedUsers: any) => {
    if (this.props.input.onChange) {
      this.props.input.onChange(selectedUsers);
    } else if (this.props.patchProjectTask) {
      this.props.patchProjectTask(selectedUsers);
    } else {
      throw new Error('please, implement "input.onChange" or "patchProjectTask"');
    }
  };

  private filterItem(filterKw: string, item: any) {
    return item.email.toLowerCase().indexOf(filterKw.toLowerCase()) === 0;
  }

  private findItemIndex(item: IUser, list: any) {
    const members: IUser[] = list.list ? list.list : list;
    if (Array.isArray(members)) {
      return members.findIndex(el => el.id === item.id);
    }
    return -1;
  }

  private getLabel = (member: IUser) => member.email;
}
