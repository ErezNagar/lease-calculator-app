import React from "react";
import PropTypes from "prop-types";
import LeaseCalculator from "lease-calculator";
import { Statistic, Row, Col, Button, Dropdown, Menu, Radio } from "antd";
import {
  MONTHLY_PAYMENT_TO_MSRP_THRESHOLD,
  OFF_MSRP_THRESHOLD,
  RESULTS_CHANGE_DELAY,
  DUMMY_DEFAULT_LEASE_DATA,
  SHARE_BUTTON_SUCCESS_MESSAGE_DELAY,
  TAXATION_METHOD_MONTHLY,
  TAXATION_METHOD_SALE_PRICE,
  TAXATION_METHOD_TOTAL,
  MAKE,
} from "./constants";
import {
  GithubOutlined,
  FacebookFilled,
  MailOutlined,
  DownOutlined,
} from "@ant-design/icons";
import _ from "underscore";
import Fade from "./components/Fade";
import ToggledSection from "./components/ToggledSection";
import InputNumberField from "./components/InputNumberField";
import InputPercentageField from "./components/InputPercentageField";
import queryString from "query-string";

export default class Calculator extends React.Component {
  static propTypes = {
    msrp: PropTypes.number,
    sellingPrice: PropTypes.number,
    rv: PropTypes.number,
    isRVPercent: PropTypes.bool,
    mf: PropTypes.number,
    leaseTerm: PropTypes.number,
    salesTax: PropTypes.number,
    dealerFees: PropTypes.number,
    governmentFees: PropTypes.number,
    incentives: PropTypes.number,
    downPayment: PropTypes.number,
    taxMethod: PropTypes.number,
  };

  static defaultProps = {
    ...DUMMY_DEFAULT_LEASE_DATA,
  };

  state = {
    fields: {
      ...this.props,
    },
    results: {},
    isLoading: false,
    shareButtonLoading: false,
  };

  componentDidMount() {
    const queryStringData = this.getQueryString();
    if (queryStringData) {
      this.calculateLease(queryStringData);
    } else {
      this.calculateLease(this.props);
    }
  }

  getQueryString = () => {
    const query = queryString.parse(window.location.search);
    if (Object.keys(query).length === 0) {
      return null;
    }
    Object.keys(query).forEach((key) => {
      query[key] =
        key === "mf" || key === "salesTax"
          ? (query[key] = parseFloat(query[key]))
          : (query[key] = parseInt(query[key]));
    });
    return { make: query.makeId, ...query };
  };

  calculateLease = (data) => {
    const leaseCalculator = new LeaseCalculator();
    const { incentives, dealerFees, governmentFees, make, ...rest } = data;
    try {
      leaseCalculator.calculate({
        rebates: incentives,
        totalFees: dealerFees + governmentFees,
        // lease-calculator takes a string
        make: MAKE.find((m) => m.id === make)?.displayName,
        ...rest,
      });
    } catch (e) {
      // TODO implement erro fallback
      console.log("e", e);
      return;
    }

    const msrpPercentage = leaseCalculator.getMonthlyPaymentToMsrpPercentage();
    const offMsrp = leaseCalculator.getDiscountOffMsrpPercentage();
    this.setState({
      fields: { ...data },
      results: {
        msrpPercentage,
        offMsrp,
        RVValue: leaseCalculator.getRVValue(),
        RVPercent: leaseCalculator.getRVPercentage(),
        apr: leaseCalculator.getAPR(),
        totalCost: leaseCalculator.getTotalLeaseCost(),
        monthlyPaymentPreTax: leaseCalculator.getMonthlyPaymentPreTax(),
        monthlyPayment: leaseCalculator.getMonthlyPayment(),
        isMsrpPercentageThreshold:
          msrpPercentage <= MONTHLY_PAYMENT_TO_MSRP_THRESHOLD,
        isOffMsrpThreshold: offMsrp >= OFF_MSRP_THRESHOLD,
        driveOff: leaseCalculator.getDriveOffPayment(),
        acquisitionFee: leaseCalculator.getAcquisitionFee(),
        dispositionFee: leaseCalculator.getDispositionFee(),
      },
    });
  };

  showSelectedMake = () => {
    const make = MAKE.find((m) => m.id === this.state.fields.make)?.displayName;
    return make ? make : "Select Make";
  };

  handleDropDownClick = (make) => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          make: make.id,
        },
      },
      () => {
        this.calculateLease(this.state.fields);
      }
    );
  };

  handleChange = (value, field) => {
    if (value && !isNaN(value) && !isNaN(parseFloat(value))) {
      this.debounce(value, field);
    }
  };

  handleTaxChange = (e) => {
    const state = { ...this.state };
    state.fields.taxMethod = e.target.value;
    this.setState(state, () => {
      this.calculateLease(this.state.fields);
    });
  };

  debounce = _.debounce((value, field) => {
    const state = { ...this.state };
    state.fields[field] = value;
    this.setState(state, () => {
      this.calculateLease(this.state.fields);
    });
  }, RESULTS_CHANGE_DELAY);

  handleShareCalculation = () => {
    this.setState({ shareButtonLoading: true });
    const { isRVPercent, ...data } = this.state.fields;
    const query = queryString.stringify(data);
    const url = `${window.location.origin}${window.location.pathname}?${query}`;

    if (navigator.permissions) {
      navigator.permissions?.query({ name: "clipboard-write" }).then((res) => {
        if (res.state === "granted" || res.state === "prompt") {
          navigator.clipboard.writeText(url).then(() => {
            setTimeout(() => {
              this.setState({
                shareButtonLoading: false,
              });
            }, SHARE_BUTTON_SUCCESS_MESSAGE_DELAY);
          });
        }
      });
    } else {
      var textField = document.createElement("textarea");
      textField.innerText = url;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setTimeout(() => {
        this.setState({
          shareButtonLoading: false,
        });
      }, SHARE_BUTTON_SUCCESS_MESSAGE_DELAY);
    }
  };

  render() {
    return (
      <div className="pageContainer">
        <header>
          <h1>LeaseOmeteR</h1>
          <p>{"Car lease calculator for people in a hurry"}</p>
        </header>
        <div className="pageBody">
          <Row justify="center">
            <Col className="intro-text">
              {
                "The calculator is auto-filled with example lease numbers. Enter yours to better understand your deal."
              }
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={13}>
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
                                    onClick={() =>
                                      this.handleDropDownClick(make)
                                    }
                                    type="text"
                                  >
                                    {make.displayName}
                                  </Button>
                                </Menu.Item>
                              ))}
                            </Menu>
                          }
                        >
                          <Button
                            onClick={(e) => e.preventDefault()}
                            size="large"
                          >
                            {this.showSelectedMake()}
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
                          value={this.state.fields.msrp}
                          onChange={this.handleChange}
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
                              value={this.state.fields.sellingPrice}
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col xs={24} sm={14} className={"text-align-left"}>
                            <Fade show={!this.state.isLoading} fadeInOnly>
                              {`${this.state.results.offMsrp}% off MSRP`}
                            </Fade>
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
                          value={this.state.fields.leaseTerm}
                          formatter={(v) => v}
                          onChange={this.handleChange}
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
                              value={this.state.fields.mf}
                              formatter={(v) => v}
                              onChange={this.handleChange}
                              onPressEnter={this.handleClick}
                              min={0.0000001}
                              step={0.0001}
                              max={0.02}
                            />
                          </Col>
                          <Col xs={24} sm={10} className={"text-align-left"}>
                            <Fade show={!this.state.isLoading} fadeInOnly>
                              {`${this.state.results.apr}% APR`}
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
                              value={this.state.results.RVPercent}
                              onChange={this.handleChange}
                              onPressEnter={this.handleClick}
                            />
                          </Col>
                          <Col xs={24} sm={10} className={"text-align-left"}>
                            <Fade show={!this.state.isLoading} fadeInOnly>
                              {`$${this.state.results.RVValue}`}
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
                          value={this.state.fields.downPayment}
                          onChange={this.handleChange}
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
                          value={this.state.fields.incentives}
                          onChange={this.handleChange}
                        />
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
                          value={this.state.results.acquisitionFee}
                          disabled
                        />
                      </Col>
                      {!MAKE.find((m) => m.id === this.state.fields.make) && (
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
                          value={this.state.fields.dealerFees}
                          onChange={this.handleChange}
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
                          value={this.state.fields.governmentFees}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]} align="middle">
                      <Col xs={10} sm={8} className={"text-align-left"}>
                        {"Sales Tax:"}
                      </Col>
                      <Col xs={14} sm={16} className={"text-align-left"}>
                        <InputPercentageField
                          fieldName={"salesTax"}
                          value={this.state.fields.salesTax}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row gutter={[8, 0]} align="middle">
                      <Col span={24} className={"text-align-left"}>
                        <Radio.Group
                          options={[
                            {
                              label:
                                "Tax applied on monthly payment (most states)",
                              value: TAXATION_METHOD_MONTHLY,
                            },
                            {
                              label: "Tax applied on sales price (VA only)",
                              value: TAXATION_METHOD_SALE_PRICE,
                            },
                            {
                              label:
                                "Tax applied on total lease payments (e.g. NY, NJ, MN, OH, GA)",
                              value: TAXATION_METHOD_TOTAL,
                            },
                          ]}
                          value={this.state.fields.taxMethod}
                          onChange={this.handleTaxChange}
                        />
                      </Col>
                    </Row>
                  </>
                }
              />
            </Col>

            <Col xs={24} lg={11}>
              <div className={"sticky"}>
                <ToggledSection
                  class={"results"}
                  content={
                    <>
                      <Row gutter={[8, 8]} align="middle">
                        <Col xs={13} sm={10} className={"text-align-left"}>
                          {"Monthly Pre-Tax:"}
                        </Col>
                        <Col xs={11} sm={14}>
                          <Fade show={!this.state.isLoading} fadeInOnly>
                            <Statistic
                              value={this.state.results.monthlyPaymentPreTax}
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
                            <Fade show={!this.state.isLoading} fadeInOnly>
                              <Statistic
                                value={this.state.results.monthlyPayment}
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
                          <Fade show={!this.state.isLoading} fadeInOnly>
                            {`${this.state.results.msrpPercentage}%`}
                          </Fade>
                        </Col>
                      </Row>
                      <Row gutter={[8, 8]} align="middle">
                        <Col xs={13} sm={10} className={"text-align-left"}>
                          {"Drive off:"}
                        </Col>
                        <Col xs={11} sm={14}>
                          <Fade show={!this.state.isLoading} fadeInOnly>
                            <Statistic
                              value={this.state.results.driveOff}
                              precision={2}
                              prefix="$"
                            />
                          </Fade>
                        </Col>
                      </Row>
                      <Row gutter={[8, 8]} align="middle">
                        <Col xs={13} sm={10} className={"text-align-left"}>
                          {"Disposition Fee:"}
                        </Col>
                        <Col xs={11} sm={14}>
                          <Fade show={!this.state.isLoading} fadeInOnly>
                            <Statistic
                              value={this.state.results.dispositionFee}
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
                          <Fade show={!this.state.isLoading} fadeInOnly>
                            <Statistic
                              value={this.state.results.totalCost}
                              precision={2}
                              prefix="$"
                            />
                          </Fade>
                        </Col>
                      </Row>
                    </>
                  }
                />
                <Row gutter={[0, 8]} align="middle" justify="center">
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      loading={this.state.shareButtonLoading}
                      onClick={this.handleShareCalculation}
                    >
                      Share your numbers
                    </Button>
                  </Col>
                </Row>
                <Row align="middle" justify="center">
                  <Col>Click to copy a shareable link</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <footer>
          <Row gutter={[0, 8]} align="middle" justify="center">
            <Col>
              {"Learn from our "}
              <a
                href="https://www.facebook.com/groups/1914738435321873"
                title="community"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"community"}
              </a>
              {" how to get a good lease deal. "}
              <a
                href="mailto: erez.nagar@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let us know
              </a>
              {" if you find any calculation discrepancies. Thanks!"}
            </Col>
          </Row>
          <Row gutter={[0, 8]} align="middle" justify="center">
            <Col>
              {
                "This calculator is in beta version. Use for estimation purposes only."
              }
            </Col>
          </Row>
          <Row gutter={[0, 0]} align="middle" justify="center">
            <Col>
              <Button
                className="footer-icon"
                type="link"
                href="https://github.com/ErezNagar/lease-calculator-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined />
              </Button>
            </Col>
            <Col>
              <Button
                className="footer-icon"
                type="link"
                href="https://www.facebook.com/groups/1914738435321873"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookFilled />
              </Button>
            </Col>
            <Col>
              <Button
                className="footer-icon"
                type="link"
                href="mailto: erez.nagar@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailOutlined />
              </Button>
            </Col>
          </Row>
        </footer>
      </div>
    );
  }
}
