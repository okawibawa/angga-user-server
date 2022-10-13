module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "wewinexo@gmail.com",
          pass: "ISBdOHnJKaRYr5j0",
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "hello@example.com",
        defaultReplyTo: "hello@example.com",
      },
    },
  },
});
