import React from "react";
import PropTypes from "prop-types";
import { Statistic, Row, Col } from "antd";
import Fade from "./Fade";
import ToggledSection from "./ToggledSection";

const FinanceCalculatorResults = ({ fields, results, isLoading }) => (
  <ToggledSection
    class={"results"}
    content={
      <>
        <div className="monthly-payment">
          <Row gutter={[8, 8]} align="middle">
            <Col xs={14} sm={10} className={"text-align-left"}>
              {"Monthly Payment:"}
            </Col>
            <Col xs={10} sm={14}>
              <Fade show={!isLoading} fadeInOnly>
                <Statistic
                  value={results.monthlyPayment}
                  precision={2}
                  prefix="$"
                />
              </Fade>
            </Col>
          </Row>
        </div>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Principal:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic value={results.principal} precision={2} prefix="$" />
            </Fade>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Interest:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic value={results.interest} precision={2} prefix="$" />
            </Fade>
          </Col>
        </Row>
        {fields.downPayment > 0 && (
          <Row gutter={[8, 8]} align="middle">
            <Col xs={13} sm={10} className={"text-align-left"}>
              {"Due At Signing:"}
            </Col>
            <Col xs={11} sm={14}>
              <Fade show={!isLoading} fadeInOnly>
                <Statistic
                  value={fields.downPayment}
                  precision={2}
                  prefix="$"
                />
              </Fade>
            </Col>
          </Row>
        )}
        {fields.downPayment > 0 && (
          <Row gutter={[8, 8]} align="middle">
            <Col xs={13} sm={10} className={"text-align-left"}>
              {"Trade In:"}
            </Col>
            <Col xs={11} sm={14}>
              <Fade show={!isLoading} fadeInOnly>
                <Statistic value={fields.tradeIn} precision={2} prefix="$" />
              </Fade>
            </Col>
          </Row>
        )}
        <Row gutter={[8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Total Cost:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic value={results.totalCost} precision={2} prefix="$" />
            </Fade>
          </Col>
        </Row>
      </>
    }
  />
);

FinanceCalculatorResults.propTypes = {
  results: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

FinanceCalculatorResults.defaultProps = {
  isLoading: false,
};

export default FinanceCalculatorResults;
