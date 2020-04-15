import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";
import ReadMoreLink from "../components/ReadMoreLink";

const RV = (props) => (
  <BaseField
    title="Residual Value"
    description={
      <>
        <span>
          The value of the vehicle at the end of the lease. The higher, the
          better.
        </span>
        <ReadMoreLink href="http://bit.ly/LeaseMFRV" />
      </>
    }
    fieldName="rv"
    suffix={"%"}
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

RV.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

RV.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default RV;
