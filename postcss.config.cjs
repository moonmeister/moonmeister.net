/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = () => ({
	plugins: [
		require('tailwindcss/nesting'),
		require('tailwindcss'),
		require('autoprefixer'),
	],
});
