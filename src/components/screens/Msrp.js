import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";

// Not just a field but a screen (because it has the desciption part on the left)

const Msrp = (props) => (
  <BaseField
    title="MSRP"
    description="Manufacturer Suggested Retail Price. No one really pays the full MSRP of a vehicle, don't be the one that does."
    fieldName="msrp"
    onClickNext={props.onClickNext}
    onClickSkipWizard={props.onClickSkipWizard}
    showSkipWizardButton
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
