// ------------------- imports
import $ from 'jquery';
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
import Header from 'components/Header';
import pageWidgetInit from './dev_vendors/dev_widget';
// ------------------- imports###

// ------------------  import components
// ------------------  import components###

window.jQuery = $;
window.$ = $;

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';
// eslint-disable-next-line no-console
console.info('%c%s', styles, message);

// -------------------  dev widget
if (GLOBAL_VARS.projectDevStatus) {
	pageWidgetInit();
	console.log(process.env.NODE_ENV);
}
// -------------------  dev widget###

// -------------------  global variables

const readyFunc = () => {
	console.log('ready');

	const header = new Header({
		// header
		header: '.header',
		background: '.headerBackground',
		headerY: 42,
		// burger
		burger: '.burger',
		burgerTop: '.burgerLineTop',
		burgerCenter: '.burgerLineCenter',
		burgerBottom: '.burgerLineBottom',
		burgerLineHeight: 3.2,
		distanceBetweenBurgerLines: 6.4,
		// menu mobile
		menu: '.mobileMenu',
		menuCross: '.mobileMenuCross',
	});
};

const loadFunc = () => {
	console.log('page load');
};

documentReady(() => {
	readyFunc();
});

pageLoad(() => {
	loadFunc();
});
