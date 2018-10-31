import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { length } from 'redux-form-validators';

import { TitleInput } from 'liw-components/TitleInput';

export interface IDescriptionFormData {
  description?: string;
}

export interface IDescriptionFormProps extends InjectedFormProps<IDescriptionFormData, IDescriptionFormProps> {
  classes?: any;
  currentUserWorkId?: number;
  userWorkId?: number;
}

export class DescriptionFormTsx extends React.Component<IDescriptionFormProps, {}> {
  private input: HTMLTextAreaElement;

  public componentWillReceiveProps(nextProps: IDescriptionFormProps) {
    if (
      nextProps.currentUserWorkId &&
      nextProps.currentUserWorkId !== this.props.currentUserWorkId &&
      nextProps.currentUserWorkId === nextProps.userWorkId
    ) {
      this.input.focus();
    }
  }

  public render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          getTextarea={this.getTextarea}
          classNameInput={classes.field}
          onSubmit={handleSubmit}
          icon={null}
          name="description"
          component={TitleInput}
          validate={[length({ min: 3, if: (vv, v) => !!v })]}
        />
      </form>
    );
  }

  private getTextarea = (node: HTMLTextAreaElement) => {
    this.input = node;
  };
}
