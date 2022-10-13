"use strict";

const bcrypt = require("bcrypt");

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

  async forgotPassword(ctx) {
    const {
      body: { email },
    } = ctx.request;

    const emailTemplate = {
      subject: "Reset password.",
      text: "Boo.",
      html: "We are sorry that you lost your password, but we are here to help. Click the link to reset your password: http://localhost:3000/contact-us",
    };

    const template = await strapi.plugins[
      "email"
    ].services.email.sendTemplatedEmail(
      {
        to: email,
      },
      emailTemplate
    );

    return template;
  },

  async resetPassword(ctx) {
    const {
      body: { email, password },
    } = ctx.request;

    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { email: email },
      });

    if (!user) {
      ctx.throw(400, "User not found.");
    }

    // Generate new hash password
    const pass = bcrypt.hashSync(password, 10);

    // Update user password
    const updatedUserPassword = await strapi.db
      .query("plugin::users-permissions.user")
      .update({
        where: { email: email },
        data: { password: pass },
      });

    console.log({ updatedUserPassword });

    return { code: 200, message: "Password updated." };
  },
}));
