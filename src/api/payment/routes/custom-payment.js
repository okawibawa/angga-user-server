"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/ongkir/hitung/:id",
      handler: "payment.calculateCost",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/xendit/create-va",
      handler: "payment.xenditCreateVa",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/xendit/create-invoice",
      handler: "payment.createInvoice",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/xendit/get-va",
      handler: "payment.xenditVa",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/payment/callback-xendit",
      handler: "payment.xenditCallback",
      config: {
        policies: [],
      },
    },
  ],
};
