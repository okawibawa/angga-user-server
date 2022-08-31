"use strict";

/**
 *  profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", () => ({
  async getProfileDetail(ctx) {
    const { full_name } = ctx.params;

    ctx.query = {
      ...ctx.query,
      filters: {
        full_name: {
          $eq: full_name,
        },
      },
      populate: {
        user: {
          populate: "*",
        },
      },
    };

    const profile = await super.findOne(ctx);

    return profile;
  },

  async registerUserProfile(ctx) {
    const context = ctx;

    const user = await strapi.plugins[
      "users-permissions"
    ].controllers.auth.register(ctx);

    console.log({ ctx: ctx.response.body.user });

    context.request.body = {
      data: {
        address: "",
        full_name: ctx.response.body.user.username,
        user: ctx.response.body.user.id,
      },
    };

    const profile = await super.create(context);
  },

  async updateAddress(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        user: {
          populate: "*",
        },
      },
    };

    const response = await super.update(ctx);

    const context = ctx;

    context.params = { id: response.data.attributes.user.data.id };
    context.request.body = { address: true };

    delete context.populate;

    const user = await strapi.plugins[
      "users-permissions"
    ].controllers.user.update(context);

    return response;
  },
}));
