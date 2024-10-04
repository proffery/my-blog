module.exports = {
  extends: [
    "@it-incubator/eslint-config",
    "plugin:storybook/recommended",
    "plugin:@next/next/recommended",
    "plugin:storybook/recommended",
    "plugin:@react-three/recommended"
  ],
  rules: {
    "react/no-unknown-property": "off"
  }
}