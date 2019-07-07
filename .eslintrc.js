module.exports = {
    "extends": "airbnb-base",
    env: {
      node: true,
      mocha: true,
    },
    rules: {
      'no-console': 'off',
      'max-len': 'off',
      'no-use-before-define': 'off',
      "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.js"]}]
    },
};