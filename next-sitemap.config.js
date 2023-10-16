/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://kinguru.io",
  output: "standalone",
  generateRobotsTxt: true,
};
