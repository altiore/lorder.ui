import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
const FaUser = require('react-icons/lib/fa/user');

import { Button } from 'liw-components/dist/Button'
import { Input } from 'liw-components/dist/Input'

export interface IMagicFormProps {
  title?: string,
  buttonText?: string,
}

export class MagicForm extends React.Component<IMagicFormProps & InjectedFormProps<{}, IMagicFormProps>, object> {
  public render() {
    const { title, buttonText, handleSubmit, pristine, submitting } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          {title && <h3 styleName="title">{title}</h3>}
          <Field
            name="email"
            component={Input}
            type="email"
            icon={<FaUser />}
          />
          <Button type="submit" stretch primary disabled={pristine || submitting} isLoading={submitting}>
            <span>{buttonText}</span>
          </Button>
        </form>
      </div>
    );
  }
}

