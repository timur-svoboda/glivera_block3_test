// ------------------- imports
import $ from 'jquery';
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
import MobileMenu from 'components/MobileMenu';
import Burger from 'components/Burger';
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
		header: '.header',
		inner: '.header .header_in',
		bg: '.header_bg',
		fixedMod: 'header--fixed',
		borderRadius: 4,
	});

	const mobileMenu = new MobileMenu({
		menu: '.mobile_menu',
		cross: '.mobile_menu .icon_button--cross',
		openMod: 'mobile_menu--open',
	});

	const burger = new Burger({
		burger: '.burger',
		top: '.burger .burger_line--top',
		center: '.burger .burger_line--center',
		bottom: '.burger .burger_line--bottom',
		height: 3.2,
		offset: 6.4,
	});

	burger.el.on('click', () => mobileMenu.open());

	mobileMenu.el.on('closed', () => burger.uncross());
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
