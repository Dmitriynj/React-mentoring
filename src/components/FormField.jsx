import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textField: {
    paddingBottom: 10,
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiFormLabel-root': {
      color: 'white',
    },
  },
  label: {
    fontWeight: 400,
    color: 'white',
    fontSize: 14,
    marginBottom: 2,
  },
}));

const FormField = ({
  alias,
  type,
  label,
  value,
  onChange,
  touched,
  errorMsg,
  children,
  ...other
}) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <TextField
        fullWidth
        color="secondary"
        id={alias}
        name={alias}
        type={type}
        className={classes.textField}
        value={value}
        onChange={onChange}
        error={touched && Boolean(errorMsg)}
        helperText={touched && errorMsg}
        {...other}
      >
        {children}
      </TextField>
    </>
  );
};
FormField.propTypes = {
  alias: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
FormField.defaultProps = {
  touched: null,
  errorMsg: null,
  children: null,
};

export { FormField };
