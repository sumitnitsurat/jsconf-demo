import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: ['src/chat-demo.js'],
	output: {
		file: 'build/chat-demo.js',
    format: 'es',
		sourcemap: false
	},
	plugins: [
    resolve(),
    babel(),
    terser()
  ]
};