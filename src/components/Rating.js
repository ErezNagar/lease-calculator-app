import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";

export default class Rating extends React.Component {
  static propTypes = { rate: PropTypes.func.isRequired };

  state = {
    hasVoted: false,
  };

  handleChange = (rating) => {
    this.setState({ hasVoted: true });
    this.props.rate(rating);
  };

  render() {
    return (
      <>
        <Row gutter={[0, 8]} align="middle" justify="center">
          <Col>
            <Rate
              character={<HeartFilled />}
              onChange={this.handleChange}
              style={{ color: "red", fontSize: "2em" }}
              allowHalf
              disabled={this.state.hasVoted}
            />
          </Col>
        </Row>
        <Row gutter={[0, 8]} align="middle" justify="center">
          <Col>Rate this calculator</Col>
        </Row>
      </>
    );
  }
}
