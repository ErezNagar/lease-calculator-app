import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Dropdown, Menu, Typography } from "antd";
import Fade from "../Fade";
import { SCREEN_CHANGE_DELAY } from "../constants";

const { Text } = Typography;

const MilesList = [
  { value: 7500, text: "7500" },
  { value: 10000, text: "10000" },
  { value: 12000, text: "12000" },
  { value: 15000, text: "15000" },
];

export default class Make extends React.Component {
  static propTypes = {
    onClickNext: PropTypes.func,
  };

  static defaultProps = {
    onClickNext() {},
  };

  state = {
    value: "",
    displayText: "Miles/Year",
    isNextDisabled: true,
    show: true,
  };

  handleClick = (e) => {
    this.setState(
      {
        value: e.key,
        displayText: e.item.props.children,
      },
      () => {
        this.handleClickNext();
      }
    );
  };

  handleClickNext = () => {
    this.setState({ show: false }, () => {
      setTimeout(() => {
        this.props.onClickNext({ field: "miles", value: this.state.value });
      }, SCREEN_CHANGE_DELAY);
    });
  };

  render() {
    const menu = (
      <Menu onClick={this.handleClick}>
        {MilesList.map((make) => (
          <Menu.Item key={make.value}>{make.text}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div className="pageContainer">
        <div className="section section--description flex-vertical-center">
          <Fade show={this.state.show}>
            <div className="title">Miles/Year</div>
            <div className="description">
              How many miles a year the lease is for.
            </div>
          </Fade>
        </div>
        <div className="section section--input">
          <div className="sub-section-input flex-vertical-center">
            <Fade show={this.state.show}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Text className="dropdown-make">
                  {this.state.displayText}
                  <Icon type="down" style={{ fontSize: 16 }} />
                </Text>
              </Dropdown>
            </Fade>
          </div>
          <div className="sub-section-navigation">
            <div className="button-container button-left"></div>
            <div className="button-container button-right">
              <Button
                type="primary"
                onClick={this.handleClickNext}
                disabled={this.state.isNextDisabled}
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
