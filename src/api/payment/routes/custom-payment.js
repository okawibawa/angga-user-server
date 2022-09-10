"use strict";

module.exports = {
  routes: [
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
