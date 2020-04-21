import React from "react";
import PropTypes from "prop-types";
import {
  InputNumber,
  Divider,
  Statistic,
  Spin,
  Row,
  Col,
  Space,
  Button,
} from "antd";
import {
  MONTHLY_PAYMENT_TO_MSRP_THRESHOLD,
  OFF_MSRP_THRESHOLD,
  RESULTS_CHANGE_DELAY,
} from "./constants";
import {
  GithubOutlined,
  FacebookFilled,
  LoadingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import _ from "underscore";
import LeaseCalculator from "./lease-calculator/LeaseCalculator";
import Fade from "./components/Fade";
import FieldIndicator from "./components/FieldIndicator";

const leaseCalculator = new LeaseCalculator();

export default class CalculatorResults extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      msrp: PropTypes.number.isRequired,
      sellingPrice: PropTypes.number.isRequired,
      leaseTerm: PropTypes.number.isRequired,
      mf: PropTypes.number.isRequired,
      rv: PropTypes.number.isRequired,
      isRVPercent: PropTypes.bool.isRequired,
      downPayment: PropTypes.number,
      rebates: PropTypes.number,
      totalFees: PropTypes.number,
      salesTax: PropTypes.number,
    }).isRequired,
  };

  static defaultProps = {
    data: {
      downPayment: 0,
      rebates: 0,
      totalFees: 0,
      salesTax: 0,
    },
  };

  state = {
    data: { ...this.props.data },
    results: {},
    isLoading: false,
    isShowData: true,
    isError: false,
  };

  componentDidMount() {
    const data = this.calculateLease(this.props.data);
    this.setState({ results: { ...data } });
  }

  calculateLease = (data) => {
    try {
      leaseCalculator.calculate(data);
    } catch (e) {
      return;
    }

    const msrpPercentage = leaseCalculator.getMonthlyPaymentToMsrpPercentage();
    const offMsrp = leaseCalculator.getDiscountOffMsrpPercentage();
    return {
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
    };
  };

  handleChange = (value, field) => {
    this.setState({ isLoading: true, isShowData: false }, () => {
      this.debounce(value, field);
    });
  };

  debounce = _.debounce((value, field) => {
    const state = { ...this.state };
    state.data[field] = value;
    // Only the RV percent is editable
    state.data.isRVPercent = true;
    this.setState(state, () => {
      const results = this.calculateLease(this.state.data);
      if (!results) {
        this.setState({
          isError: true,
          isLoading: false,
        });
        return;
      }
      this.setState({
        ...this.state,
        results: { ...results },
        isShowData: true,
        isLoading: false,
        isError: false,
      });
    });
  }, RESULTS_CHANGE_DELAY);

  render() {
    return (
      <>
        <div className="pageContainer">
          {this.state.isLoading && (
            <div className={"spinner"}>
              <Spin indicator={<LoadingOutlined />} />
            </div>
          )}
          <div className="section section--description results flex-vertical-center">
            <div className="monthly-payment desktop">
              <div className="title">{"Monthly Payment"}</div>
              <Fade show={this.state.isShowData} fadeInOnly>
                <div className="description">
                  {this.state.isError ? (
                    <span className="input-error">-</span>
                  ) : (
                    <Statistic
                      value={this.state.results.monthlyPayment}
                      precision={2}
                      prefix="$"
                      valueStyle={{ color: "white", fontSize: 40 }}
                    />
                  )}
                  <div style={{ marginTop: "25px" }}>
                    {this.state.isError
                      ? "Something went wrong. Please try again."
                      : "Here's your monthly payment. You can change the lease numbers on the right to see how they affect the payment."}
                  </div>
                </div>
                <div className="footer desktop">
                  <div className="footer-disclaimer desktop">
                    This calculator is in beta version. Use for estimation
                    purposes only. Let us know of you find any discrepancies,
                    thanks!
                  </div>
                  <Space size={"medium"}>
                    <Divider className="divider" />
                    <Button
                      className="footer-icon desktop"
                      type="link"
                      href="https://github.com/ErezNagar/lease-calculator-app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubOutlined />
                    </Button>
                    <Button
                      className="footer-icon desktop"
                      type="link"
                      href="https://www.facebook.com/groups/1914738435321873"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookFilled />
                    </Button>
                    <Button
                      className="footer-icon desktop"
                      type="link"
                      href="mailto: erez.nagar@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MailOutlined />
                    </Button>
                  </Space>
                </div>
              </Fade>
            </div>
            <div className="monthly-payment mobile">
              <span className="title">{"Monthly Payment:"}</span>
              <Fade show={this.state.isShowData} fadeInOnly isInline>
                <span className="description">
                  {this.state.isError ? (
                    <span className="input-error">-</span>
                  ) : (
                    <Statistic
                      className="inline"
                      value={this.state.results.monthlyPayment}
                      precision={2}
                      prefix="$"
                      valueStyle={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "400",
                      }}
                    />
                  )}
                </span>
              </Fade>
            </div>
          </div>
          <div className="section section--results">
            <div className="interactive-desc mobile">
              {this.state.isError
                ? "Something went wrong. Please try again."
                : "You can change the lease numbers below to see how they affect the payment"}
            </div>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"MSRP:"}
              </Col>
              <Col className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.msrp}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(v) => this.handleChange(v, "msrp")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 0]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Selling Price:"}
              </Col>
              <Col span={10} className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.sellingPrice}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(v) => this.handleChange(v, "sellingPrice")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} type="flex" align="middle">
              <Col span={10}></Col>
              <Col>
                <Fade show={this.state.isShowData} fadeInOnly>
                  <FieldIndicator
                    fieldText={`${this.state.results.offMsrp}% off MSRP`}
                    tooltipContent={
                      "Ideally, the negotiated selling price is at least 10% off of MSRP."
                    }
                    cssClass={"sellingPrice"}
                    isAboveThreshold={this.state.results.isOffMsrpThreshold}
                    isError={this.state.isError}
                  />
                </Fade>
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Months:"}
              </Col>
              <Col className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.leaseTerm}
                  onChange={(v) => this.handleChange(v, "leaseTerm")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 0]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Money Factor:"}
              </Col>
              <Col span={10} className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.mf}
                  formatter={this.props.formatter}
                  parser={this.props.parser}
                  onChange={(v) => this.handleChange(v, "mf")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} type="flex" align="middle">
              <Col span={10}></Col>
              <Col>
                <Fade show={this.state.isShowData} fadeInOnly>
                  {this.state.isError ? "-" : `${this.state.results.apr}% APR`}
                </Fade>
              </Col>
            </Row>
            <Row gutter={[8, 0]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Residual:"}
              </Col>
              <Col span={10} className="text-align-left">
                <InputNumber
                  value={this.state.results.RVPercent}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(v) => this.handleChange(v, "rv")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} type="flex" align="middle">
              <Col span={10}></Col>
              <Col>
                <Fade show={this.state.isShowData} fadeInOnly>
                  {this.state.isError ? "-" : `$${this.state.results.RVValue}`}
                </Fade>
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Down Payment:"}
              </Col>
              <Col span={10} className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.downPayment}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(v) => this.handleChange(v, "downPayment")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Rebates:"}
              </Col>
              <Col className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.rebates}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(v) => this.handleChange(v, "rebates")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Fees:"}
              </Col>
              <Col className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.totalFees}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(v) => this.handleChange(v, "totalFees")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Sales Tax:"}
              </Col>
              <Col className="text-align-left">
                <InputNumber
                  defaultValue={this.props.data.salesTax}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(v) => this.handleChange(v, "salesTax")}
                  onPressEnter={this.handleClick}
                  size="large"
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Monthly Pre-Tax:"}
              </Col>
              <Col className="text-align-left">
                <Fade show={this.state.isShowData} fadeInOnly>
                  {this.state.isError ? (
                    <span className="input-error">-</span>
                  ) : (
                    <Statistic
                      value={this.state.results.monthlyPaymentPreTax}
                      precision={2}
                      prefix="$"
                    />
                  )}
                </Fade>
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"% of MSRP:"}
              </Col>
              <Col className="text-align-left">
                <Fade
                  show={this.state.isShowData}
                  fadeInOnly
                  style={{ width: "100%" }}
                >
                  <FieldIndicator
                    fieldText={`${this.state.results.msrpPercentage}%`}
                    tooltipContent="As a rule of thumb, a reasonable monthly payment for a good deal is 1% percent of MSRP."
                    cssClass={"msrpPercent"}
                    isAboveThreshold={
                      this.state.results.isMsrpPercentageThreshold
                    }
                    isError={this.state.isError}
                  />
                </Fade>
              </Col>
            </Row>
            <Row gutter={[8, 8]} type="flex" align="middle">
              <Col span={10} className="text-align-right">
                {"Total Cost:"}
              </Col>
              <Col className="text-align-left">
                <Fade show={this.state.isShowData} fadeInOnly>
                  {this.state.isError ? (
                    <span className="input-error">-</span>
                  ) : (
                    <Statistic
                      value={this.state.results.totalCost}
                      precision={2}
                      prefix="$"
                    />
                  )}
                </Fade>
              </Col>
            </Row>
          </div>
          <div className="footer mobile">
            <div className="divider">
              <Divider />
            </div>
            <div className="footer-content">
              <div className="footer-disclaimer mobile">
                This calculator is in beta version. Use for estimation purposes
                only. Let us know of you find any discrepancies, thanks!
              </div>
              <Space size={"medium"}>
                <Divider className="divider" />
                <Button
                  className="footer-icon mobile"
                  type="link"
                  href="https://github.com/ErezNagar/lease-calculator-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubOutlined />
                </Button>
                <Button
                  className="footer-icon mobile"
                  type="link"
                  href="https://www.facebook.com/groups/1914738435321873"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookFilled />
                </Button>
                <Button
                  className="footer-icon mobile"
                  type="link"
                  href="mailto: erez.nagar@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlined />
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </>
    );
  }
}
