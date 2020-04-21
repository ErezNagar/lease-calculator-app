import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";

const Msrp = (props) => (
  <BaseField
    title="Months"
    description="The length of the lease. More than 36 is less than ideal since usually the manufacturer warranty is for 3 years."
    fieldName="leaseTerm"
    placeholder={36}
    prefix={""}
    suffix={""}
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

Msrp.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

Msrp.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default Msrp;
