import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";

const SellingPrice = props => (
  <BaseField
    title="Selling Price"
    description="The negotiated price of the vehicle, not including dealer rebates and manufacturer incentives. Aim for a minimum of 10% off MSRP."
    fieldName="sellingPrice"
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

SellingPrice.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func
};

SellingPrice.defaultProps = {
  onClickNext() {},
  onClickBack() {}
};

export default SellingPrice;
