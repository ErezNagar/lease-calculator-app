import React from "react";
import PropTypes from "prop-types";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const FieldIndicator = ({ text, isAboveThreshold, isError }) =>
  isError ? (
    "-"
  ) : (
    <>
      {text}
      {isAboveThreshold ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" className="threshold-icon" />
      ) : (
        <CloseCircleTwoTone twoToneColor="#eb2f96" className="threshold-icon" />
      )}
    </>
  );

FieldIndicator.propTypes = {
  text: PropTypes.string.isRequired,
  isAboveThreshold: PropTypes.bool,
  isError: PropTypes.bool,
};

FieldIndicator.defaultProps = {
  isAboveThreshold: false,
  isError: false,
};

export default FieldIndicator;
