import React from "react";
import "./App.css";
// import Make from "./screens/Make";
import Msrp from "./screens/Msrp";
import SellingPrice from "./screens/SellingPrice";
import Months from "./screens/Months";
// import Miles from "./screens/Miles";
import MF from "./screens/MF";
import RV from "./screens/RV";
import DownPayment from "./screens/DownPayment";
import Rebates from "./screens/Rebates";
import Fees from "./screens/Fees";
import SalesTax from "./screens/SalesTax";
import CalculatorResults from "./CalculatorResults";
import { Progress } from "antd";

const SCREENS = [
  // Make,
  Msrp,
  SellingPrice,
  Months,
  // Miles,
  MF,
  RV,
  DownPayment,
  Rebates,
  Fees,
  SalesTax,
];

export default class App extends React.Component {
  state = {
    currentScreen: 0,
    isLastScreen: false,
    leaseData: {},
  };

  handleClickBack = () => {
    this.setState({
      currentScreen: this.state.currentScreen - 1,
    });
  };

  handleClickNext = (input) => {
    let { currentScreen } = this.state;
    const leaseData = { ...this.state.leaseData };
    leaseData[input.field] = input.value;
    const isLastScreen = currentScreen + 1 === SCREENS.length;
    if (!isLastScreen) {
      currentScreen += 1;
    }
    this.setState({
      leaseData,
      isLastScreen,
      currentScreen,
    });
  };

  render() {
    const Screen = SCREENS[this.state.currentScreen];
    return this.state.isLastScreen ? (
      <CalculatorResults data={this.state.leaseData}></CalculatorResults>
    ) : (
      <>
        <Progress
          percent={(this.state.currentScreen / SCREENS.length) * 100}
          showInfo={false}
          size="small"
          className="progress"
        />
        <Screen
          progress={this.state.currentScreen / SCREENS.length}
          onClickNext={this.handleClickNext}
          onClickBack={this.handleClickBack}
        ></Screen>
      </>
    );
  }
}
