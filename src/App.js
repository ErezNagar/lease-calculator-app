import React from "react";
import "./App.css";
import Calculator from "./Calculator";

export default class App extends React.Component {
  //http://localhost:3000/lease-calculator-app?dealerFees=900&governmentFees=300&incentives=500&leaseTerm=36&make=22&mf=0.00125&msrp=23000&rv=57&salesTax=10.25&sellingPrice=21000&taxMethod=3

  render() {
    return <Calculator />;
  }
}
