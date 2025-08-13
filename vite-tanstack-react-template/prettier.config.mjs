/** @type {import("prettier").Config} */
const config = {
  semi: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSeparation: false,
  importOrder: ['.(?:scss|css)', '<THIRD_PARTY_MODULES>', '^@\\/', '^[./]'],
}

export default config
