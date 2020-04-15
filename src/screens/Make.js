import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Dropdown, Menu, Typography } from "antd";
import Fade from "../Fade";
import { SCREEN_CHANGE_DELAY } from "../constants";

const { Text } = Typography;

const MakeList = [
  { value: "select", text: "Select Make" },
  { value: "acura", text: "Acura" },
  { value: "audi", text: "Audi" },
  { value: "bmw", text: "BMW" },
  { value: "chevrolet", text: "Chevrolet" },
  { value: "chrysler", text: "Chrysler" },
  { value: "ford", text: "Ford" },
  { value: "gmc", text: "GMC" },
  { value: "honda", text: "Honda" },
  { value: "hyundai", text: "Hyundai" },
  { value: "infiniti", text: "Infiniti" },
  { value: "volvo", text: "Volvo" },
  { value: "jeep", text: "Jeep" },
  { value: "kia", text: "Kia" },
  { value: "landRover", text: "Land Rover" },
  { value: "lexus", text: "Lexus" },
  { value: "mazda", text: "Mazda" },
  { value: "mercedesBenz", text: "Mercedes Benz" },
  { value: "nissan", text: "Nissan" },
  { value: "subaru", text: "Subaru" },
  { value: "toyota", text: "Toyota" },
  { value: "volkswagen", text: "Volkswagen" },
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
    displayText: "Select Make",
    isNextDisabled: true,
    show: true,
  };

  handleClick = (e) => {
    this.setState(
      {
        value: e.key,
        displayText: e.item.props.children,
        isNextDisabled: e.key === "select",
      },
      () => {
        if (e.key !== "select") {
          this.handleClickNext();
        }
      }
    );
  };

  handleClickNext = () => {
    this.setState({ show: false }, () => {
      setTimeout(() => {
        this.props.onClickNext({ field: "make", value: this.state.value });
      }, SCREEN_CHANGE_DELAY);
    });
  };

  render() {
    const menu = (
      <Menu onClick={this.handleClick}>
        {MakeList.map((make) => (
          <Menu.Item key={make.value}>{make.text}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div className="pageContainer">
        <div className="section section--description flex-vertical-center">
          <Fade show={this.state.show}>
            <div className="title">Make</div>
            <div className="description">{this.props.description}</div>
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
                // size={"large"}
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
