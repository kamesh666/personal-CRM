const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const { User, Admin } = require("../models/userModel");
const session = require("express-session");

const app = express();

AdminBro.registerAdapter(AdminBroMongoose);

app.use(bodyParser.json());

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
    },
    {
      resource: Admin,
    },
  ],
  branding: {
    companyName: "personal CRM",
    logo: "https://i.ibb.co/205678y/logo192x192.png",
    softwareBrothers: false,
  },
});

// Set up session
app.use(
  session({
    secret: "your-secret-key",
    saveUninitialized: false,
  })
);

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "kameshjeeva30@gmail.com",
  password: process.env.ADMIN_PASS || "password",
};

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "adminbro",
  cookiePassword: process.env.ADMIN_COOKIE_PASS || "supersecret",

  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
  // cookiePassword: "your-secret-cookie-password",
});
app.use(adminBro.options.rootPath, adminRouter);

// const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro);

module.exports = { adminRouter };
