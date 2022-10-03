import React from "react";
import PropTypes from "prop-types";
import LeaseCalculator from "lease-calculator";
import { Row, Col, Button, Segmented } from "antd";
import {
  SHARE_BUTTON_DELAY,
  SHARE_BUTTON_TEXT,
  SHARE_BUTTON_SUCCESS_CLICK_TEXT,
  SHARE_BUTTON_HELPER_TEXT,
  MONTHLY_PAYMENT_TO_MSRP_THRESHOLD,
  OFF_MSRP_THRESHOLD,
  RESULTS_CHANGE_DELAY,
  DUMMY_DEFAULT_LEASE_DATA,
  SHARE_BUTTON_SUCCESS_MESSAGE_DELAY,
  MAKE,
  CALCULATOR_TYPE_LEASE,
  CALCULATOR_TYPE_FINANCE,
  DUMMY_DEFAULT_FINANCE_DATA,
} from "./constants";
import {
  GithubOutlined,
  FacebookFilled,
  MailOutlined,
} from "@ant-design/icons";
import _ from "underscore";
import ToggledSection from "./components/ToggledSection";
import Rating from "./components/Rating";
import LeaseCalculatorFields from "./components/LeaseCalculatorFields";
import LeaseCalculatorResults from "./components/LeaseCalculatorResults";
import FinanceCalculatorFields from "./components/FinanceCalculatorFields";
import FinanceCalculatorResults from "./components/FinanceCalculatorResults";
import queryString from "query-string";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push } from "firebase/database";

export default class Calculator extends React.Component {
  static propTypes = {
    lease: PropTypes.shape({
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
    }),
    finance: PropTypes.shape({
      msrp: PropTypes.number,
      sellingPrice: PropTypes.number,
      salesTax: PropTypes.number,
      term: PropTypes.number,
      taxableFees: PropTypes.number,
      untaxableFees: PropTypes.number,
      apr: PropTypes.number,
      downPayment: PropTypes.number,
      tradeIn: PropTypes.number,
      rebates: PropTypes.number,
    }),
  };

  static defaultProps = {
    lease: DUMMY_DEFAULT_LEASE_DATA,
    finance: DUMMY_DEFAULT_FINANCE_DATA,
  };

  state = {
    lease: {
      fields: { ...this.props.lease },
      results: {},
    },
    finance: {
      fields: { ...this.props.finance },
      results: {},
    },
    isLoading: false,
    shareButtonLoading: false,
    shareButtonHelperText: SHARE_BUTTON_HELPER_TEXT,
    // Whether calculator is set for leasing or financing
    calculatorType: CALCULATOR_TYPE_LEASE,
  };

  logRating = (rating) => {
    const fbDB = getDatabase();
    push(child(ref(fbDB), "rating"), {
      dateTime: new Date().toString(),
      rating,
    });
  };

  componentDidMount() {
    initializeApp({
      apiKey: process.env.REACT_APP_FB_API_KEY,
      authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FB_DB_URL,
    });

    const queryStringData = this.getQueryString();
    if (queryStringData) {
      if (queryStringData.type === CALCULATOR_TYPE_LEASE) {
        this.calculateLease(queryStringData);
      } else {
        this.setState({ calculatorType: CALCULATOR_TYPE_FINANCE });
        this.calculateFinance(queryStringData);
      }
    } else {
      this.calculateLease(this.props.lease);
    }
  }

  getQueryString = () => {
    const query = queryString.parse(window.location.search);
    if (Object.keys(query).length === 0 || Object.keys(query)[0] === "fbclid") {
      return null;
    }
    Object.keys(query).forEach((key) => {
      if (key === "mf" || key === "salesTax" || key === "finSalesTax") {
        query[key] = parseFloat(query[key]);
      } else if (key === "isZeroDriveoff") {
        query[key] = query[key] === "true";
      } else if (key === "type") {
        query[key] = query[key];
      } else {
        query[key] = parseInt(query[key]);
      }
    });
    return { make: query.makeId, ...query };
  };

  calculateLease = (data) => {
    const leaseCalculator = new LeaseCalculator();
    const { incentives, dealerFees, governmentFees, make, ...rest } = data;
    let results;

    try {
      results = leaseCalculator.calculate({
        rebates: incentives,
        totalFees: dealerFees + governmentFees,
        // lease-calculator takes a string
        make: MAKE.find((m) => m.id === make)?.displayName,
        ...rest,
      });
    } catch (e) {
      // TODO implement error fallback
      console.log("e", e);
      return;
    }

    const msrpPercentage = results.getMonthlyPaymentToMsrpPercentage();
    const offMsrp = results.getDiscountOffMsrpPercentage();
    const driveOffDetails = results.getDriveOffPaymentBreakdown();
    this.setState({
      lease: {
        fields: { ...data },
        results: {
          msrpPercentage,
          offMsrp,
          RVValue: results.getRVValue(),
          RVPercent: results.getRVPercentage(),
          apr: results.getAPR(),
          totalCost: results.getTotalLeaseCost(),
          monthlyPaymentPreTax: results.getMonthlyPaymentPreTax(),
          monthlyPayment: results.getMonthlyPayment(),
          isMsrpPercentageThreshold:
            msrpPercentage <= MONTHLY_PAYMENT_TO_MSRP_THRESHOLD,
          isOffMsrpThreshold: offMsrp >= OFF_MSRP_THRESHOLD,
          driveOff: results.getDriveOffPayment(),
          acquisitionFee: results.getAcquisitionFee(),
          dispositionFee: results.getDispositionFee(),
          driveOffDetails: driveOffDetails,
        },
      },
    });
  };

  calculateFinance = (data) => {
    const leaseCalculator = new LeaseCalculator();
    const results = leaseCalculator.calculateFinance(data);

    const { msrp, sellingPrice } = data;
    const offMsrp = msrp - sellingPrice;
    const offMsrpPercentage = (offMsrp / msrp) * 100;
    const offMsrpPercentageRound = Math.round(offMsrpPercentage * 100) / 100;

    this.setState({
      finance: {
        fields: { ...data },
        results: {
          offMsrp: offMsrpPercentageRound <= 0 ? null : offMsrpPercentageRound,
          monthlyPayment: results.getFinanceMonthlyPayment(),
          principal: results.getTotalAmountFinanced(),
          interest: results.getFinanceTotalInterest(),
          totalCost: results.getFinanceTotalCost(),
        },
      },
    });
  };

  showSelectedMake = () => {
    const make = MAKE.find(
      (m) => m.id === this.state.lease.fields.make
    )?.displayName;
    return make ? make : "Select Make";
  };

  handleDropDownClick = (make) => {
    this.setState(
      {
        lease: {
          fields: {
            ...this.state.lease.fields,
            make: make.id,
          },
          results: { ...this.state.lease.results },
        },
      },
      () => {
        this.calculateLease(this.state.lease.fields);
      }
    );
  };

  handleChange = (value, field) => {
    if (value === 0 || (value && !isNaN(value) && !isNaN(parseFloat(value)))) {
      this.debounce(value, field);
    }
  };

  handleTaxChange = (e) => {
    const state = { ...this.state };
    state.lease.fields.taxMethod = e.target.value;
    this.setState(state, () => {
      this.calculateLease(this.state.lease.fields);
    });
  };

  debounce = _.debounce((value, field) => {
    const state = { ...this.state };
    if (this.state.calculatorType === CALCULATOR_TYPE_LEASE) {
      state.lease.fields[field] = value;
      this.setState(state, () => {
        this.calculateLease(this.state.lease.fields);
      });
    } else {
      state.finance.fields[field] = value;
      this.setState(state, () => {
        this.calculateFinance(this.state.finance.fields);
      });
    }
  }, RESULTS_CHANGE_DELAY);

  handleShareCalculation = () => {
    this.setState({ shareButtonLoading: true });
    const { isRVPercent, ...leaseFields } = this.state.lease.fields;
    const fields =
      this.state.calculatorType === CALCULATOR_TYPE_LEASE
        ? leaseFields
        : this.state.finance.fields;
    fields.type = this.state.calculatorType;
    const query = queryString.stringify({ ...fields });
    const url = `${window.location.origin}${window.location.pathname}?${query}`;

    if (navigator.permissions) {
      navigator.permissions?.query({ name: "clipboard-write" }).then((res) => {
        if (res.state === "granted" || res.state === "prompt") {
          navigator.clipboard.writeText(url).then(() => {
            this.showShareSuccess();
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
      this.showShareSuccess();
    }
  };

  showShareSuccess = () => {
    setTimeout(() => {
      this.setState(
        {
          shareButtonLoading: false,
          shareButtonHelperText: SHARE_BUTTON_SUCCESS_CLICK_TEXT,
        },
        () => {
          setTimeout(() => {
            this.setState({
              shareButtonHelperText: SHARE_BUTTON_HELPER_TEXT,
            });
          }, SHARE_BUTTON_SUCCESS_MESSAGE_DELAY);
        }
      );
    }, SHARE_BUTTON_DELAY);
  };

  handleChangeZeroDriveOff = (e) => {
    this.debounce(e.target.checked, "isZeroDriveoff");
  };

  handleChangeCalculatorType = (type) => {
    this.setState(
      {
        calculatorType:
          type === "Lease" ? CALCULATOR_TYPE_LEASE : CALCULATOR_TYPE_FINANCE,
      },
      () => {
        if (this.state.calculatorType === CALCULATOR_TYPE_LEASE) {
          this.calculateLease(this.state.lease.fields);
        } else {
          this.calculateFinance(this.state.finance.fields);
        }
      }
    );
  };

  render() {
    return (
      <div className="pageContainer">
        <header>
          <h1>Car Lease & Finance Calculator</h1>
        </header>
        <div className="pageBody">
          <Row justify="center">
            <Col className="intro-text">
              {
                "The calculator is auto-filled with example numbers. Enter yours to better understand your deal."
              }
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={13}>
              <ToggledSection
                content={
                  <Segmented
                    block
                    size="large"
                    options={["Lease", "Finance"]}
                    value={this.state.calculatorType}
                    onChange={this.handleChangeCalculatorType}
                  />
                }
              />
              {this.state.calculatorType === CALCULATOR_TYPE_LEASE ? (
                <LeaseCalculatorFields
                  fields={this.state.lease.fields}
                  results={this.state.lease.results}
                  handleDropDownClick={this.handleDropDownClick}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  handleTaxChange={this.handleTaxChange}
                  handleChangeZeroDriveOff={this.handleChangeZeroDriveOff}
                  showSelectedMake={this.showSelectedMake}
                  isLoading={this.state.isLoading}
                />
              ) : (
                <FinanceCalculatorFields
                  fields={this.state.finance.fields}
                  results={this.state.finance.results}
                  handleChange={this.handleChange}
                  isLoading={this.state.isLoading}
                />
              )}
            </Col>

            <Col xs={24} lg={11}>
              <div className={"sticky"}>
                {this.state.calculatorType === CALCULATOR_TYPE_LEASE ? (
                  <LeaseCalculatorResults
                    results={this.state.lease.results}
                    isLoading={this.state.isLoading}
                  />
                ) : (
                  <FinanceCalculatorResults
                    fields={this.state.finance.fields}
                    results={this.state.finance.results}
                    isLoading={this.state.isLoading}
                  />
                )}
                <Row gutter={[0, 8]} align="middle" justify="center">
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      loading={this.state.shareButtonLoading}
                      onClick={this.handleShareCalculation}
                    >
                      {SHARE_BUTTON_TEXT}
                    </Button>
                  </Col>
                </Row>
                <Row align="middle" justify="center">
                  <Col>{this.state.shareButtonHelperText}</Col>
                </Row>
                <Row gutter={[0, 8]} align="middle" justify="center">
                  <Col>
                    <Rating rate={this.logRating} />
                  </Col>
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
