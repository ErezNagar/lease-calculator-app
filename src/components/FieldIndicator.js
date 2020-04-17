import React from "react";
import PropTypes from "prop-types";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import withTooltip from "./withTooltip";

const FieldIndicator = ({
  fieldText,
  isAboveThreshold,
  isError,
  onMouseEnter,
  onMouseLeave,
}) =>
  isError ? (
    "-"
  ) : (
    <>
      {fieldText}
      {isAboveThreshold ? (
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          className="threshold-icon"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onMouseEnter}
        />
      ) : (
        <CloseCircleTwoTone
          twoToneColor="#eb2f96"
          className="threshold-icon"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onMouseEnter}
        />
      )}
    </>
  );

FieldIndicator.propTypes = {
  fieldText: PropTypes.string.isRequired,
  isAboveThreshold: PropTypes.bool,
  isError: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

FieldIndicator.defaultProps = {
  isAboveThreshold: false,
  isError: false,
  onMouseEnter() {},
  onMouseLeave() {},
};

export default withTooltip(FieldIndicator);
