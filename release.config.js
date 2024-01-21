const appName = `kinguru-next`;

module.exports = {
  name: appName,
  tagFormat: "v${version}",
  commitPaths: [
    "components/*",
    "pages/*",
    "prisma/*",
    "public/*",
    "server/*",
    "utils/*",
    ".projenrc.ts",
    ".eslintrc.json",
    "global.d.ts",
    "instrumentation.node.ts",
    "instrumentation.ts",
    "next.config.js",
    "next-env.d.ts",
    "next-i18next.config.js",
    "nextauth.d.ts",
    "package.json",
    "package-lock.json",
    "tsconfig.dev.json",
    "tsconfig.json",
    "werf.yaml",
  ],
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: `CHANGELOG.md`,
      },
    ],
    [
      "@google/semantic-release-replace-plugin",
      {
        replacements: [
          {
            files: [".helm/Chart.yaml"],
            from: "appVersion: .*",
            to: "appVersion: ${nextRelease.version}",
            results: [
              {
                file: ".helm/Chart.yaml",
                hasChanged: true,
                numMatches: 1,
                numReplacements: 1,
              },
            ],
            countMatches: true,
          },
        ],
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", ".helm/Chart.yaml"],
        message:
          `chore(release): ${appName}` +
          "-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
