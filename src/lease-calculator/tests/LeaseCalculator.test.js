import LeaseCalculator from "../LeaseCalculator";
import {
  DUMMY_LEASE_ZERO_DOWN_DATA,
  DUMMY_LEASE_WITH_DOWN_DATA,
  DUMMY_LEASE_PERCENT_RV_DATA,
  PAYMENT_ZERO_DOWN,
  PAYMENT_ZERO_DOWN_PRE_TAX,
  PAYMENT_WITH_DOWN,
  // Residual value of the vehicle
  RV_VALUE,
  // APR % of MF
  APR,
  // Discount off MSRP in %
  OFF_MSRP,
  // Monthly payment as a percentage of the MSRP
  MSRP_PERCENTAGE
} from "./constants";

describe("LeaseCalculator", () => {
  describe("Validates", () => {
    it("missing a required field throws an error", () => {
      expect(() => {
        new LeaseCalculator({
          ...DUMMY_LEASE_ZERO_DOWN_DATA,
          msrp: null
        });
      }).toThrow(Error);
    });

    it("missing a required field throws an error with Invalid Input message", () => {
      expect(() => {
        new LeaseCalculator({
          ...DUMMY_LEASE_ZERO_DOWN_DATA,
          msrp: null
        });
      }).toThrowError(`Invalid Input: MSRP`);
    });

    it("missing a required field throws an error with Invalid Input message", () => {
      expect(() => {
        new LeaseCalculator({
          ...DUMMY_LEASE_ZERO_DOWN_DATA,
          msrp: null
        });
      }).toThrowError(`Invalid Input: MSRP`);
    });
  });

  describe("Calculates", () => {
    it("the correct monthly payment w/ zero down", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_ZERO_DOWN_DATA);
      leaseCalculator.calculate();
      const payment = leaseCalculator.getMonthlyPayment();
      expect(payment).toEqual(PAYMENT_ZERO_DOWN);
    });

    it("the correct monthly payment w/ a down payment", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_WITH_DOWN_DATA);
      leaseCalculator.calculate();
      const payment = leaseCalculator.getMonthlyPayment();
      expect(payment).toEqual(PAYMENT_WITH_DOWN);
    });

    it("the correct discount off msrp", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_ZERO_DOWN_DATA);
      leaseCalculator.calculate();
      const offMsrp = leaseCalculator.getDiscountOffMsrpPercentage();
      expect(offMsrp).toEqual(OFF_MSRP);
    });

    it("the correct MSRP percentage (1% rule)", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_ZERO_DOWN_DATA);
      leaseCalculator.calculate();
      leaseCalculator.getMonthlyPayment();
      const msrpPercentage = leaseCalculator.getMonthlyPaymentToMsrpPercentage();
      expect(msrpPercentage).toEqual(MSRP_PERCENTAGE);
    });

    it("the correct pre-tax monthly payment", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_ZERO_DOWN_DATA);
      leaseCalculator.calculate();
      leaseCalculator.getMonthlyPayment();
      const paymentPreTax = leaseCalculator.getMonthlyPaymentPreTax();
      expect(paymentPreTax).toEqual(PAYMENT_ZERO_DOWN_PRE_TAX);
    });

    it("the correct RV value from relative RV", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_PERCENT_RV_DATA);
      leaseCalculator.calculate();
      leaseCalculator.getMonthlyPayment();
      const rv = leaseCalculator.getRVValue();
      expect(rv).toEqual(RV_VALUE);
    });

    it("the correct monthly payment w/ relative RV", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_PERCENT_RV_DATA);
      leaseCalculator.calculate();
      const payment = leaseCalculator.getMonthlyPayment();
      expect(payment).toEqual(PAYMENT_ZERO_DOWN);
    });

    it("the correct APR", () => {
      const leaseCalculator = new LeaseCalculator(DUMMY_LEASE_PERCENT_RV_DATA);
      leaseCalculator.calculate();
      const apr = leaseCalculator.getAPR();
      expect(apr).toEqual(APR);
    });
  });
});
