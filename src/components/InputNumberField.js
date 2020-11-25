import React from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

const InputNumberField = ({
  fieldName,
  value,
  onChange,
  formatter,
  min,
  ...rest
}) => (
  <InputNumber
    value={value}
    formatter={formatter}
    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
    onChange={(v) => onChange(v, fieldName)}
    size="large"
    min={min}
    {...rest}
  />
);

InputNumberField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  min: PropTypes.number,
};

InputNumberField.defaultProps = {
  value: 0,
  onChange() {},
  formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  min: 0,
};

export default InputNumberField;
