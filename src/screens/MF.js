import React from "react";
import PropTypes from "prop-types";
import BaseField from "./BaseScreen";
import ReadMoreLink from "../components/ReadMoreLink";

const MF = (props) => (
  <BaseField
    title="Money Factor"
    description={
      <>
        <span>
          The interest rate on the deal. Same as APR, only using a decimel unit
          instead. The lower, the better.
        </span>
        <ReadMoreLink href="http://bit.ly/LeaseMFRV" />
      </>
    }
    fieldName="mf"
    placeholder={0.00123}
    prefix={""}
    suffix={""}
    onClickNext={props.onClickNext}
    onClickBack={props.onClickBack}
  />
);

MF.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
};

MF.defaultProps = {
  onClickNext() {},
  onClickBack() {},
};

export default MF;
