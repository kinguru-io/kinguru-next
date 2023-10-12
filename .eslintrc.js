module.exports = {
  env: {browser: true, amd: true, node: true},
  extends: [
    'molindo/typescript',
    'molindo/react',
    'plugin:@next/next/recommended'
  ],
  overrides: [
    {
      files: ['*.spec.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
}
