import React from "react";
import PropTypes from "prop-types";
import { Statistic, Row, Col } from "antd";
import Fade from "./Fade";
import ToggledSection from "./ToggledSection";

const LeaseCalculatorResults = ({ results, isLoading }) => (
  <ToggledSection
    class={"results"}
    content={
      <>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Monthly Pre-Tax:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic
                value={results.monthlyPaymentPreTax}
                precision={2}
                prefix="$"
              />
            </Fade>
          </Col>
        </Row>
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
            {"% of MSRP:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              {`${results.msrpPercentage}%`}
            </Fade>
          </Col>
        </Row>
        <Row gutter={results.driveOffDetails ? [8, 0] : [8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Due At Signing:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic value={results.driveOff} precision={2} prefix="$" />
            </Fade>
          </Col>
        </Row>
        {results.driveOffDetails &&
          results.driveOffDetails.map((item) => {
            return (
              <div className="driveoff-details" key={item.type}>
                <Row gutter={[0, 0]} align="middle">
                  <Col xs={13} sm={10} className={"text-align-left"}>
                    {`${item.label}:`}
                  </Col>
                  <Col xs={11} sm={14}>
                    <Fade show={!isLoading} fadeInOnly>
                      <Statistic
                        value={`${item.amount}`}
                        precision={2}
                        prefix="$"
                      />
                    </Fade>
                  </Col>
                </Row>
              </div>
            );
          })}
        <Row gutter={[8, 8]} align="middle">
          <Col xs={13} sm={10} className={"text-align-left"}>
            {"Disposition Fee:"}
          </Col>
          <Col xs={11} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic
                value={results.dispositionFee}
                precision={2}
                prefix="$"
              />
            </Fade>
          </Col>
        </Row>

        <Row gutter={[8, 8]} align="middle">
          <Col xs={12} sm={10} className={"text-align-left"}>
            {"Total Cost:"}
          </Col>
          <Col xs={12} sm={14}>
            <Fade show={!isLoading} fadeInOnly>
              <Statistic value={results.totalCost} precision={2} prefix="$" />
            </Fade>
          </Col>
        </Row>
      </>
    }
  />
);

LeaseCalculatorResults.propTypes = {
  isLoading: PropTypes.bool,
  results: PropTypes.object.isRequired,
};

LeaseCalculatorResults.defaultProps = {
  isLoading: false,
};

export default LeaseCalculatorResults;
