import React from "react";
import "./App.css";
// import Make from "./components/screens/Make";
import Msrp from "./components/screens/Msrp";
import SellingPrice from "./components/screens/SellingPrice";
import Months from "./components/screens/Months";
// import Miles from "./components/screens/Miles";
import MF from "./components/screens/MF";
import RV from "./components/screens/RV";
import DownPayment from "./components/screens/DownPayment";
import Rebates from "./components/screens/Rebates";
import Fees from "./components/screens/Fees";
import SalesTax from "./components/screens/SalesTax";
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
    if (input.field === "rv") {
      leaseData.isRVPercent = input.isRVPercent;
    }
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
