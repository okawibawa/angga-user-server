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
      path: "/profile-detail/:id",
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
  ],
};
