"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/xendit/create-va",
      handler: "payment.xenditCreateVa",
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
