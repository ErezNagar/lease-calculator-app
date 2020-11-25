import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

export default class ToggledSection extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.node,
    class: PropTypes.string,
  };

  static defaultProps = {
    title: "",
    content: null,
    class: "",
  };

  state = { isOpen: true };

  handleClick = (e) => {
    this.setState({ isOpen: this.state.isOpen ? false : true });
  };

  render() {
    return this.state.isOpen ? (
      this.props.title ? (
        <section className={this.props.class ? this.props.class : null}>
          <div className={"section-title"} onClick={this.handleClick}>
            <Row>
              <Col>
                <div className="title-text">{this.props.title}</div>
              </Col>
            </Row>
          </div>
          <div className={"section-content"}>{this.props.content}</div>
        </section>
      ) : (
        <section className={this.props.class ? this.props.class : null}>
          <div className={"section-content"}>{this.props.content}</div>
        </section>
      )
    ) : (
      <section className="section--closed">
        <div className={"section-title"} onClick={this.handleClick}>
          {this.props.title}
        </div>
      </section>
    );
  }
}
