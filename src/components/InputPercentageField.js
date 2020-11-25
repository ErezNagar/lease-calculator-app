import React from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

const InputPercentageField = ({ fieldName, value, onChange }) => (
  <InputNumber
    value={value}
    formatter={(value) => `${value}%`}
    parser={(value) => value.replace("%", "")}
    onChange={(v) => onChange(v, fieldName)}
    size="large"
    min={0}
  />
);

InputPercentageField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

InputPercentageField.defaultProps = {
  value: 0,
  onChange() {},
};

export default InputPercentageField;
