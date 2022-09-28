// Monthly payment out of MSRP, in percentage
export const MONTHLY_PAYMENT_TO_MSRP_THRESHOLD = 1;
// Discount off of MSRP, in percentage
export const OFF_MSRP_THRESHOLD = 10;
// Results onChange loading delay
export const RESULTS_CHANGE_DELAY = 10;

// Calculator type
export const CALCULATOR_TYPE_LEASE = "lease";
export const CALCULATOR_TYPE_FINANCE = "finance";

export const ESC_KEY = 27;
export const RIGHT_KEY = 39;

export const SHARE_BUTTON_TEXT = "Share your numbers";
export const SHARE_BUTTON_HELPER_TEXT = "Click to copy a shareable link";
export const SHARE_BUTTON_SUCCESS_CLICK_TEXT = "Link copied!";
export const SHARE_BUTTON_DELAY = 1000;
export const SHARE_BUTTON_SUCCESS_MESSAGE_DELAY = 3000;

export const MAKE = [
  {
    id: 1,
    displayName: "Acura",
  },
  { id: 3, displayName: "Audi" },
  {
    id: 4,
    displayName: "Bmw",
  },
  {
    id: 6,
    displayName: "Cadillac",
  },
  {
    id: 7,
    displayName: "Chevrolet",
  },
  {
    id: 8,
    displayName: "Chrysler",
  },
  {
    id: 9,
    displayName: "Dodge",
  },
  {
    id: 11,
    displayName: "Ford",
  },
  {
    id: 13,
    displayName: "GMC",
  },
  {
    id: 14,
    displayName: "Honda",
  },
  {
    id: 15,
    displayName: "Hyundai",
  },
  {
    id: 16,
    displayName: "Infiniti",
  },
  {
    id: 18,
    displayName: "Jeep",
  },
  {
    id: 19,
    displayName: "Kia",
  },
  {
    id: 20,
    displayName: "Land Rover",
  },
  {
    id: 21,
    displayName: "Lexus",
  },
  {
    id: 24,
    displayName: "Mazda",
  },
  {
    id: 25,
    displayName: "Mercedes benz",
  },
  {
    id: 26,
    displayName: "Mitsubishi",
  },
  {
    id: 27,
    displayName: "Nissan",
  },
  {
    id: 28,
    displayName: "Ram",
  },
  {
    id: 31,
    displayName: "Subaru",
  },
  {
    id: 33,
    displayName: "Toyota",
  },
  {
    id: 34,
    displayName: "Volkswagen",
  },
  {
    id: 35,
    displayName: "Volvo",
  },
];

// Tax applied on monthly payment
export const TAXATION_METHOD_MONTHLY = 1;
// Tax applied on sales price
export const TAXATION_METHOD_SALE_PRICE = 2;
// Taxed applied on total lease price
export const TAXATION_METHOD_TOTAL = 3;

export const DUMMY_DEFAULT_LEASE_DATA = {
  make: 33,
  msrp: 23000,
  sellingPrice: 21000,
  rv: 57,
  isRVPercent: true,
  mf: 0.00125,
  leaseTerm: 36,
  salesTax: 10.25,
  // totalFees: 1200,
  dealerFees: 900,
  governmentFees: 300,
  incentives: 500,
  // rebates: 500,
  isZeroDriveoff: false,
  taxMethod: TAXATION_METHOD_MONTHLY,
};

export const DUMMY_DEFAULT_FINANCE_DATA = {
  msrp: 50000,
  sellingPrice: 45000,
  salesTax: 6.25,
  financeTerm: 60,
  taxableFees: 250,
  untaxableFees: 300,
  APR: 4.5,
  downPayment: 0,
  tradeIn: 0,
  rebates: 0,
};
