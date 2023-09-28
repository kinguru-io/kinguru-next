const appName = `chart`;

module.exports = {
  name: appName,
  tagFormat: appName + "-v${version}",
  commitPaths: ["*"],
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
            files: ["Chart.yaml"],
            from: "version: .*",
            to: "version: ${nextRelease.version}",
            results: [
              {
                file: "Chart.yaml",
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
        assets: ["CHANGELOG.md", "Chart.yaml"],
        message:
          `chore(release): ${appName}` +
          "-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
