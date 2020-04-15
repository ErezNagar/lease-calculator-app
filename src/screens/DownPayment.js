import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";
import ReadMoreLink from "../components/ReadMoreLink";

const DownPayment = (props) => (
  <BaseField
    title="Down Payment"
    description={
      <>
        <span>
          Cash payment due at lease signing. Don't give away free money to the
          dealer. Never put a down payment.
        </span>
        <ReadMoreLink href="http://bit.ly/LeaseDownPayment" />
      </>
    }
    fieldName="downPayment"
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

DownPayment.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

DownPayment.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default DownPayment;
