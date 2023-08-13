const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const { User, Admin } = require("../models/userModel");

const app = express();

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      resource: Admin,
    },
  ],
  branding: {
    companyName: "<NAME>",
    logo: "https://i.ibb.co/205678y/logo192x192.png",
    softwareBrothers: false,
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "kameshjeeva30@gmail.com",
  password: process.env.ADMIN_PASS || "password",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "adminbro",
  cookiePassword: process.env.ADMIN_COOKIE_PASS || "supersecret",
  auth: {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
    },
    cookiePassword: "your-secret-cookie-password",
  },
});
app.use(adminBro.options.rootPath, router);

app.use(bodyParser.json());

// const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro);

module.exports = { router };
