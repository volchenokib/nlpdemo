module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    coverageReporters: ['html', 'text-summary']
  }
}
