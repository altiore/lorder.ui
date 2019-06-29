import React from "react";
import { storiesOf } from "@storybook/react";

import InputField from "@components/Input";

const Spaces = (spaces = 1) => {
  const string = <span>&nbsp;&nbsp;&nbsp;</span>;
  let prepared = [];
  for (let i = 0; i <= spaces; i++) {
    prepared.push(string);
  }
  return prepared;
};

/**
 *
 */
storiesOf("InputField", module).add("default", () => (
  <div style={{ maxWidth: 600 }}>
    <div>
      <h3>Usage:</h3>
      <div>
        <h4>{'import { Field } from "redux-form";'}</h4>
        <h4>{'import InputField from "@components/InputField";'}</h4>
        <h4>&nbsp;</h4>
        <h4>{"const MyComponent = ({ handleSubmit }) => ("}</h4>
        <h4>
          {Spaces(1)}
          {"<form onSubmit={handleSubmit}>"}
        </h4>
        <h4>
          {Spaces(3)}
          {"<Field component={InputField} />"}
        </h4>
        <h4>
          {Spaces(1)}
          {"</form>"}
        </h4>
        <h4>{");"}</h4>
      </div>
    </div>
    <InputField />
    <InputField placeholder="Placeholder" />
    <InputField label="Label" />
    <InputField label="Label" placeholder="Placeholder" />
    <InputField helperText="Helper Text" />
    <InputField error helperText="Error Text" />
  </div>
));
