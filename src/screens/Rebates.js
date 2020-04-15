import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";

const Rebates = (props) => (
  <BaseField
    title="Rebates"
    description="Total of dealer discounts and manufacturer incentives."
    fieldName="rebates"
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

Rebates.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

Rebates.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default Rebates;
