export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: { globals: { browser: true, node: true } },
    rules: { "react/react-in-jsx-scope": "off" }
  }
]
