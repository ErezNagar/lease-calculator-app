import React from "react";
import PropTypes from "prop-types";

const withTooltip = (WrappedComponent) => {
  class WithTooltip extends React.Component {
    static propTypes = {
      tooltipContent: PropTypes.node,
    };

    static defaultProps = {
      tooltipContent: null,
    };

    state = { shouldShowTooltip: false };

    componentDidMount() {}

    handleMouseEnter = () => {
      this.setState({ shouldShowTooltip: true });
    };
    handleMouseLeave = () => {
      this.setState({ shouldShowTooltip: false });
    };

    render() {
      const { tooltipContent, cssClass, ...passThroughProps } = this.props;
      return (
        <>
          <div
            className={
              this.state.shouldShowTooltip
                ? `tooltip tooltip-${cssClass}`
                : "tooltip--hidden"
            }
          >
            {tooltipContent}
          </div>
          <WrappedComponent
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...passThroughProps}
          />
        </>
      );
    }
  }

  WithTooltip.displayName = `WithTooltip(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  WithTooltip.WrappedComponent = WrappedComponent;

  return WithTooltip;
};

export default withTooltip;
