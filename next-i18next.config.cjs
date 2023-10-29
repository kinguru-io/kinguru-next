const path = require("path");

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl", "ru"],
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};

module.exports = config;
