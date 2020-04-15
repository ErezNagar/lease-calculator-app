import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Fade = ({ show, fadeInOnly, isInline, children }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  const getStyle = () => {
    const style = `500ms`;
    if (show) {
      return `fadeIn ${style}`;
    }
    return fadeInOnly ? "none" : `fadeOut ${style}`;
  };

  return (
    render && (
      <div
        className={isInline ? "fade-inline" : null}
        style={{ animation: getStyle() }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

Fade.propTypes = {
  show: PropTypes.bool.isRequired,
  fadeInOnly: PropTypes.bool,
  isInline: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Fade.defaultProps = {
  fadeInOnly: false,
  isInline: false,
};

export default Fade;
