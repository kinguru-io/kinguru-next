module.exports = {
  plugins: {
    // TODO Remove condition once @pandacss/dev with the storybook hmr fix is out
    '@pandacss/dev/postcss': process.env.STORYBOOK_DEV === 'true' ? false : {}
  },
}