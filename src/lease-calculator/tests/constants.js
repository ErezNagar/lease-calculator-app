export const DUMMY_LEASE_ZERO_DOWN_DATA = {
  msrp: 23000,
  sellingPrice: 21000,
  rv: 13110,
  isRVPercent: false,
  mf: 0.00125,
  leaseTerm: 36,
  salesTax: 6.25,
  totalFees: 1200,
  rebates: 500
};

export const DUMMY_LEASE_WITH_DOWN_DATA = {
  msrp: 23000,
  sellingPrice: 21000,
  rv: 13110,
  isRVPercent: false,
  mf: 0.00125,
  leaseTerm: 36,
  salesTax: 6.25,
  totalFees: 1200,
  rebates: 500,
  downPayment: 1700
};

export const DUMMY_LEASE_PERCENT_RV_DATA = {
  ...DUMMY_LEASE_ZERO_DOWN_DATA,
  rv: 57,
  isRVPercent: true
};

export const PAYMENT_ZERO_DOWN = 299.76;
export const PAYMENT_ZERO_DOWN_PRE_TAX = 282.12;
export const PAYMENT_WITH_DOWN = 247.32;
// Residual value of the vehicle
export const RV_VALUE = 13110;
// APR % of MF
export const APR = 3;
// Discount off MSRP in %
export const OFF_MSRP = 8.7;
// Monthly payment as a percentage of the MSRP
export const MSRP_PERCENTAGE = 1.3;
