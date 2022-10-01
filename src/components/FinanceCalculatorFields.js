import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Fade from "./Fade";
import ToggledSection from "./ToggledSection";
import InputNumberField from "./InputNumberField";
import InputPercentageField from "./InputPercentageField";

const FinanceCalculatorFields = ({
  fields,
  results,
  handleChange,
  isLoading,
}) => {
  return (
    <>
      <ToggledSection
        content={
          <>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"MSRP:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"msrp"}
                  value={fields.msrp}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 0]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Selling Price:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <Row align="middle">
                  <Col xs={24} sm={10}>
                    <InputNumberField
                      fieldName={"sellingPrice"}
                      value={fields.sellingPrice}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={24} sm={14} className={"text-align-left"}>
                    {results.offMsrp ? (
                      <Fade show={!isLoading} fadeInOnly>
                        {`${results.offMsrp}% off MSRP`}
                      </Fade>
                    ) : (
                      "No dealer discount"
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"APR:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputPercentageField
                  fieldName={"APR"}
                  value={fields.APR}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Finance Term (months):"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"financeTerm"}
                  value={fields.financeTerm}
                  formatter={(v) => v}
                  onChange={handleChange}
                  min={10}
                />
              </Col>
            </Row>
          </>
        }
      />
      <ToggledSection
        title={"Taxes & Fees"}
        content={
          <>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Sales Tax:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputPercentageField
                  fieldName={"salesTax"}
                  value={fields.salesTax}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 0]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Rebates:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"rebates"}
                  value={fields.rebates}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Taxable Fees:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"taxableFees"}
                  value={fields.taxableFees}
                  onChange={handleChange}
                />
              </Col>
              <Row gutter={[8, 0]} align="middle">
                <Col className={"text-align-left"}>
                  {
                    "Non-governmental fees (dealer doc fee, dealer add-ons, etc.)"
                  }
                </Col>
              </Row>
            </Row>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Untaxable Fees:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"untaxableFees"}
                  value={fields.untaxableFees}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 0]} align="middle">
              <Col className={"text-align-left"}>
                {
                  "Non-taxable fees (license, registration and other governmental fees)"
                }
              </Col>
            </Row>
          </>
        }
      />
      <ToggledSection
        title={"Down Payment"}
        content={
          <>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Down Payment:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"downPayment"}
                  value={fields.downPayment}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Trade In:"}
              </Col>
              <Col xs={14} sm={16} className={"text-align-left"}>
                <InputNumberField
                  fieldName={"tradeIn"}
                  value={fields.tradeIn}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

// FinanceCalculatorFields.propTypes = {
//   show: PropTypes.bool.isRequired,
//   fadeInOnly: PropTypes.bool,
//   isInline: PropTypes.bool,
//   children: PropTypes.node.isRequired,
// };

// FinanceCalculatorFields.defaultProps = {
//   fadeInOnly: false,
//   isInline: false,
// };

export default FinanceCalculatorFields;
