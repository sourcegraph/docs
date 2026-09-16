import {defineConfig, globalIgnores} from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
	...nextCoreWebVitals,
	{
		rules: {
			'react/no-unescaped-entities': 'off',
			// React Compiler rules new in eslint-plugin-react-hooks 7. The
			// findings are real but mostly in the vendored docsearch code; warn
			// until that is rewritten.
			'react-hooks/refs': 'warn',
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/static-components': 'warn'
		}
	},
	globalIgnores(['.next/**', '.contentlayer/**', 'next-env.d.ts'])
]);
