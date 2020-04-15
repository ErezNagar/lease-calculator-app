import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";

const SalesTax = (props) => (
  <BaseField
    title="Sales Tax"
    description="Your state's sales tax, if applicable."
    fieldName="salesTax"
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
    placeholder={6.25}
    prefix={""}
    suffix={"%"}
    parser={(value) => value.replace("%", "")}
  />
);

SalesTax.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

SalesTax.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default SalesTax;
