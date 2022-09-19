"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/profile/register-user",
      handler: "profile.registerUserProfile",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/profile-detail/:full_name",
      handler: "profile.getProfileDetail",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/profile-detail/update/:id",
      handler: "profile.updateAddress",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/email/forgot-password",
      handler: "profile.forgotPassword",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/email/reset-password",
      handler: "profile.resetPassword",
      config: {
        policies: [],
      },
    },
  ],
};
