import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

const ReadMoreLink = ({ href }) => (
  <Button
    type="link"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="description-link"
  >
    Read more
    <RightCircleOutlined />
  </Button>
);

ReadMoreLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default ReadMoreLink;
