import gsap from 'gsap';
import throttle from 'lodash.throttle';

function makeSticky(data) {
	// Check if header is fixed
	function isFixed() {
		return data.el.hasClass(data.fixedMod);
	}

	// Update fixation state
	function updateFixation() {
		const isInnerTouchViewport = $(document).scrollTop() >= data.offsetTop;

		if (!isFixed() && isInnerTouchViewport) {
			data.el.addClass(data.fixedMod);
		} else if (isFixed() && !isInnerTouchViewport) {
			data.el.removeClass(data.fixedMod);
		}
	}

	// Update scale value of background when header is fixed
	let maxScaleX;
	const borderRadius = parseFloat(data.bg.css('border-radius'));
	function updateMaxScaleX() {
		maxScaleX = ($(document).width() + borderRadius) / data.bg.width();
	}

	// Resize header background
	let duration = 0;
	function resizeBackground() {
		if (isFixed()) {
			gsap.to(data.bg.get(0), { scaleX: maxScaleX, duration });
		} else {
			gsap.to(data.bg.get(0), { scaleX: 1, duration });
		}
	}

	// Initialize state
	setTimeout(updateFixation);
	setTimeout(updateMaxScaleX);
	setTimeout(() => {
		resizeBackground();
		duration = 0.3;
	});

	// Add event listeners
	$(window).on('resize', () => setTimeout(updateFixation));
	$(window).on('resize', () => setTimeout(updateMaxScaleX));
	$(window).on('resize', () => setTimeout(resizeBackground));
	$(document).on('scroll', throttle(updateFixation, 100));
	$(document).on('scroll', throttle(resizeBackground, 100));
}

function makeChildrenAdaptive(data) {
	// Get children widths
	let tagsWidth;
	let navWidth;
	let burgerWidth;
	function getChildrenWidths() {
		data.tags.show();
		data.nav.show();
		data.burger.show();

		tagsWidth = data.tags.width();
		navWidth = data.nav.width();
		burgerWidth = data.burger.width();

		data.tags.hide();
		data.nav.hide();
		data.burger.hide();
	}

	// Get state of children
	let state;
	function getChildrenState() {
		const availableSpace = data.inner.width() - data.gap;

		if (tagsWidth + navWidth <= availableSpace) {
			state = {
				tags: true,
				nav: true,
				burger: false,
			};
		} else if (burgerWidth + navWidth <= availableSpace) {
			state = {
				tags: false,
				nav: true,
				burger: true,
			};
		} else {
			state = {
				tags: false,
				nav: false,
				burger: true,
			};
		}
	}

	// Update header children visibility based on state
	function updateChildrenVisibility() {
		Object.entries(state).forEach(([child, isShown]) => data[child].toggle(isShown));
	}

	// Initialize
	setTimeout(getChildrenWidths);
	setTimeout(getChildrenState);
	setTimeout(updateChildrenVisibility);

	// Update children visibility on their resize
	const childrenResizeObserver = new ResizeObserver(() => { // eslint-disable-line
		setTimeout(getChildrenWidths);
		setTimeout(getChildrenState);
		setTimeout(updateChildrenVisibility);
	});
	childrenResizeObserver.observe(data.tags.get(0));
	childrenResizeObserver.observe(data.nav.get(0));
	childrenResizeObserver.observe(data.burger.get(0));

	// Update children visibility on inner resize
	const innerResizeObserver = new ResizeObserver(() => { // eslint-disable-line
		setTimeout(getChildrenState);
		setTimeout(updateChildrenVisibility);
	});
	innerResizeObserver.observe(data.inner.get(0));
}

export default function Header(data) {
	const el = $(data.header).first();
	const inner = $(data.inner).first();
	const tags = $(data.tags).first();
	const nav = $(data.nav).first();
	const burger = $(data.burger).first();
	const bg = $(data.bg).first();
	const fixedMod = data.fixedMod || 'header--fixed';
	const gap = data.gap || 16;
	const offsetTop = data.offsetTop || 0;

	makeSticky({
		el, inner, bg, fixedMod, offsetTop,
	});

	makeChildrenAdaptive({
		el, inner, tags, nav, burger, gap,
	});
}
