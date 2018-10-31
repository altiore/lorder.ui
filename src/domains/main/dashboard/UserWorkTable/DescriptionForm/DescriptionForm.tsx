import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { length } from 'redux-form-validators';

import { TitleInput } from 'liw-components/TitleInput';

export interface IDescriptionFormData {
  description?: string;
}

export interface IDescriptionFormProps extends InjectedFormProps<IDescriptionFormData, IDescriptionFormProps> {
  classes?: any;
}

export class DescriptionFormTsx extends React.Component<IDescriptionFormProps, {}> {
  public render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          icon={null}
          name="description"
          component={TitleInput}
          validate={[length({ min: 3, if: (vv, v) => !!v })]}
        />
      </form>
    );
  }
}
