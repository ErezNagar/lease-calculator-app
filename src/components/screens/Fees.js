import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";
import ReadMoreLink from "./../ReadMoreLink";

const Fees = (props) => (
  <BaseField
    title="Fees"
    description={
      <>
        <span>
          Total amount of fees: acquisition fee, dealer and government fees.
        </span>
        <ReadMoreLink href="http://bit.ly/LeaseFees" />
      </>
    }
    fieldName="totalFees"
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

Fees.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

Fees.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default Fees;
