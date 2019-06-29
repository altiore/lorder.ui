import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldBase from "@material-ui/core/TextField";
import React from "react";

const Input = ({ classes, className, view, icon, InputProps = {}, InputLabelProps, ...rest }) => {

  return (
    <TextFieldBase
      variant="outlined"
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ) : undefined,
        ...InputProps,
      }}
      InputLabelProps={InputLabelProps}
      {...rest}
    />
  );
};

export default Input;
