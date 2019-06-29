import React from "react";
import { storiesOf } from "@storybook/react";

import InputField from ".";

storiesOf("Input", module).add("default", () => (
  <div style={{ maxWidth: 800 }}>
    <InputField />
    <InputField placeholder="Placeholder" />
    <InputField label="Label" />
    <InputField label="Label" placeholder="Placeholder" />
    <InputField helperText="Helper Text" />
    <InputField error helperText="Error Text" />
  </div>
));
