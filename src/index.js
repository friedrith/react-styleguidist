/* eslint-disable import/first */

import './polyfills';
import './styles';
import ReactDOM from 'react-dom';
import renderStyleguide from './utils/renderStyleguide';

// Examples code revision to rerender only code examples (not the whole page) when code changes
let codeRevision = 0;

let containerId = '';

if (document.getElementById('app')) {
	containerId = 'app';
	/* eslint-disable no-console */
	console.warn(
		'Using id "app" to identify container DOM element is now depecrated. Please use "rsg-root" instead.'
	);
} else {
	containerId = 'rsg-root';
}

const render = () => {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	ReactDOM.render(renderStyleguide(styleguide, codeRevision), document.getElementById(containerId));
};

window.addEventListener('hashchange', renderStyleguide);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeRevision += 1;
		render();
	});
}

render();
