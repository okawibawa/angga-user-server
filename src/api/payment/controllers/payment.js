"use strict";

/**
 *  payment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  async xenditCallback(ctx) {
    console.log({ ctx });

    return ctx.send(
      {
        message: "Body received",
      },
      200
    );
  },
}));
