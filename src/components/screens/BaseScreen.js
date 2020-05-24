import React from "react";
import PropTypes from "prop-types";
import { InputNumber, Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Fade from "../Fade";
import { SCREEN_CHANGE_DELAY, ESC_KEY, RIGHT_KEY } from "../../constants";

export default class BaseField extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    fieldName: PropTypes.node.isRequired,
    placeholder: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    parser: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickBack: PropTypes.func,
  };

  static defaultProps = {
    description: null,
    placeholder: 0,
    prefix: "$",
    suffix: "",
    parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
    onClickNext() {},
    onClickBack() {},
  };

  state = {
    value: 0,
    isNextDisabled: true,
    show: true,
    usePercentRV: true,
    isRVField: this.props.fieldName === "rv",
    isMSRPField: this.props.fieldName === "msrp",
    isDownPaymentField: this.props.fieldName === "downPayment",
  };

  handleChange = (value) => {
    this.setState({
      value,
      isNextDisabled: this.state.isDownPaymentField
        ? value.length === 0
        : !value,
    });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === ESC_KEY) {
      this.handleClickBack();
    }
    if (e.keyCode === RIGHT_KEY) {
      this.handleClickNext();
    }
  };

  handleClickBack = () => {
    this.setState({ show: false }, () => {
      setTimeout(() => {
        this.props.onClickBack();
      }, SCREEN_CHANGE_DELAY);
    });
  };

  handleClickNext = () => {
    if (this.state.isNextDisabled && !this.state.isDownPaymentField) {
      return;
    }
    this.setState({ show: false }, () => {
      setTimeout(() => {
        const values = {
          field: this.props.fieldName,
          value: this.state.value,
        };

        if (this.state.isRVField) {
          values["isRVPercent"] = this.state.usePercentRV;
        }
        this.props.onClickNext(values);
      }, SCREEN_CHANGE_DELAY);
    });
  };

  handleToggleRV = () => {
    this.setState({ usePercentRV: !this.state.usePercentRV });
  };

  getPrefix = () =>
    !this.state.isRVField ||
    (this.state.isRVField && !this.state.usePercentRV) ? (
      <span style={{ fontSize: "1.5em", marginRight: "10px" }}>
        {this.props.prefix}
      </span>
    ) : null;

  getSuffix = () =>
    !this.state.isRVField ||
    (this.state.isRVField && this.state.usePercentRV) ? (
      <span style={{ fontSize: "1.5em", marginLeft: "10px" }}>
        {this.props.suffix}
      </span>
    ) : null;

  render() {
    return (
      <div className="pageContainer">
        <div className="section section--description flex-vertical-center">
          <Fade show={this.state.show}>
            <div className="title">{this.props.title}</div>
            <div className="description">{this.props.description}</div>
          </Fade>
        </div>
        <div className="section section--input">
          <div className="sub-section-input flex-vertical-center">
            <Fade show={this.state.show}>
              {this.getPrefix()}
              <InputNumber
                placeholder={this.props.placeholder}
                parser={this.props.parser}
                onChange={this.handleChange}
                onPressEnter={this.handleClickNext}
                onKeyUp={this.handleKeyUp}
                size="large"
                type={"number"}
                min={0}
                autoFocus
              />
              {this.getSuffix()}
              {this.state.isRVField && (
                <span className="padding-left">
                  <Button
                    type="primary"
                    size={"large"}
                    onClick={this.handleToggleRV}
                  >
                    {this.state.usePercentRV ? "Use Value" : "Use %"}
                  </Button>
                </span>
              )}
            </Fade>
          </div>
          <div className="sub-section-navigation">
            <div className="button-container button-left">
              <Button
                type="primary"
                onClick={this.handleClickBack}
                disabled={this.state.isMSRPField}
                size="large"
              >
                <LeftOutlined />
                Back
              </Button>
            </div>
            <div className="button-container button-right">
              <Button
                type="primary"
                onClick={this.handleClickNext}
                disabled={this.state.isNextDisabled}
                size="large"
              >
                Next
                <RightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
