// ------------------- imports
import $ from 'jquery';
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
import MobileMenu from 'components/MobileMenu';
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

	const mobileMenu = new MobileMenu({
		menu: '.mobile_menu',
		cross: '.mobile_menu .icon_button--cross',
		openMod: 'mobile_menu--open',
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
