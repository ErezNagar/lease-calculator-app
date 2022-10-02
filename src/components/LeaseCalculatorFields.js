import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Dropdown, Menu, Radio, Checkbox } from "antd";
import {
  TAXATION_METHOD_MONTHLY,
  TAXATION_METHOD_SALE_PRICE,
  TAXATION_METHOD_TOTAL,
  MAKE,
} from "../constants";
import { DownOutlined } from "@ant-design/icons";
import Fade from "./Fade";
import ToggledSection from "./ToggledSection";
import InputNumberField from "./InputNumberField";
import InputPercentageField from "./InputPercentageField";

const LeaseCalculatorFields = ({
  fields,
  results,
  handleDropDownClick,
  handleChange,
  handleClick,
  handleTaxChange,
  handleChangeZeroDriveOff,
  showSelectedMake,
  isLoading,
}) => (
  <>
    <ToggledSection
      content={
        <>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Make:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <Dropdown
                overlay={
                  <Menu>
                    {MAKE.map((make) => (
                      <Menu.Item key={make.id}>
                        <Button
                          onClick={() => handleDropDownClick(make)}
                          type="text"
                        >
                          {make.displayName}
                        </Button>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Button onClick={(e) => e.preventDefault()} size="large">
                  {showSelectedMake()}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
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
        </>
      }
    />
    <ToggledSection
      title={"Lease Numbers"}
      content={
        <>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Months:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <InputNumberField
                fieldName={"leaseTerm"}
                value={fields.leaseTerm}
                formatter={(v) => v}
                onChange={handleChange}
                min={10}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Money Factor:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <Row align="middle">
                <Col xs={24} sm={10}>
                  <InputNumberField
                    fieldName={"mf"}
                    value={fields.mf}
                    formatter={(v) => v}
                    onChange={handleChange}
                    onPressEnter={handleClick}
                    min={0.0000001}
                    step={0.0001}
                    max={0.02}
                  />
                </Col>
                <Col xs={24} sm={10} className={"text-align-left"}>
                  <Fade show={!isLoading} fadeInOnly>
                    {`${results.apr}% APR`}
                  </Fade>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[8, 0]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Residual:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <Row align="middle">
                <Col xs={24} sm={10}>
                  <InputPercentageField
                    fieldName={"rv"}
                    value={results.RVPercent}
                    onChange={handleChange}
                    onPressEnter={handleClick}
                  />
                </Col>
                <Col xs={24} sm={10} className={"text-align-left"}>
                  <Fade show={!isLoading} fadeInOnly>
                    {`$${results.RVValue}`}
                  </Fade>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      }
    />
    <ToggledSection
      title={"Cap Cost Adjustments"}
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
          <Row gutter={[8, 0]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Incentives:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <InputNumberField
                fieldName={"incentives"}
                value={fields.incentives}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={[8, 0]} align="middle">
            <Col className={"text-align-left"}>
              {
                "Not sure which incentives you're eligible for? Find out using our "
              }
              <a
                href="http://bit.ly/IncentiveLookup"
                title="Incentives Lookup tool"
                target="_blank"
                rel="noopener noreferrer"
              >
                Incentives Lookup tool
              </a>
            </Col>
          </Row>
        </>
      }
    />
    <ToggledSection
      title={"Fees & Taxes"}
      content={
        <>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Acquisition Fee:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <InputNumberField
                fieldName={"acquisitionFee"}
                value={results.acquisitionFee}
                disabled
              />
            </Col>
            {!MAKE.find((m) => m.id === fields.make) && (
              <Col xs={10} sm={8} className={"text-align-left"}>
                {"Select a make"}
              </Col>
            )}
          </Row>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Dealer Fees:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <InputNumberField
                fieldName={"dealerFees"}
                value={fields.dealerFees}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Government Fees:"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <InputNumberField
                fieldName={"governmentFees"}
                value={fields.governmentFees}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={10} sm={8} className={"text-align-left"}>
              {"Zero Drive-Off"}
            </Col>
            <Col xs={14} sm={16} className={"text-align-left"}>
              <Checkbox
                checked={fields.isZeroDriveoff}
                onChange={handleChangeZeroDriveOff}
              >
                Capitalize fees and taxes
              </Checkbox>
            </Col>
          </Row>
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
            <Col span={24} className={"text-align-left"}>
              <Radio.Group
                options={[
                  {
                    label: "Tax applied on monthly payment (most states)",
                    value: TAXATION_METHOD_MONTHLY,
                  },
                  {
                    label: "Tax applied on sales price (MD, VA, TX)",
                    value: TAXATION_METHOD_SALE_PRICE,
                  },
                  {
                    label:
                      "Tax applied on total lease payments (e.g. GA, NY, NJ, MN, OH)",
                    value: TAXATION_METHOD_TOTAL,
                  },
                ]}
                value={fields.taxMethod}
                onChange={handleTaxChange}
              />
            </Col>
          </Row>
        </>
      }
    />
  </>
);

LeaseCalculatorFields.propTypes = {
  fields: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleDropDownClick: PropTypes.func,
  handleClick: PropTypes.func,
  handleTaxChange: PropTypes.func,
  handleChangeZeroDriveOff: PropTypes.func,
  showSelectedMake: PropTypes.func,
};

LeaseCalculatorFields.defaultProps = {
  isLoading: false,
  handleChange() {},
  handleDropDownClick() {},
  handleClick() {},
  handleTaxChange() {},
  handleChangeZeroDriveOff() {},
  showSelectedMake() {},
};

export default LeaseCalculatorFields;
