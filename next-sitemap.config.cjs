/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://eventify.today",
  output: "standalone",
  generateRobotsTxt: true,
  sourceDir: "dist",
};
