import gsap from 'gsap';
import throttle from 'lodash.throttle';

function makeSticky(data) {
	// Check if header is fixed
	function isFixed() {
		return data.el.hasClass(data.fixedMod);
	}

	// Update the distance from inner top to header top
	let innerOffsetTop;
	function updateInnerOffsetTop() {
		innerOffsetTop = (data.el.height() - data.inner.height()) / 2;
	}

	// Update fixation state
	function updateFixation() {
		const isInnerTouchViewport = $(document).scrollTop() >= innerOffsetTop;

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
	setTimeout(updateInnerOffsetTop);
	setTimeout(updateFixation);
	setTimeout(updateMaxScaleX);
	setTimeout(() => {
		resizeBackground();
		duration = 0.3;
	});

	// Add event listeners
	$(window).on('resize', () => setTimeout(updateInnerOffsetTop));
	$(window).on('resize', () => setTimeout(updateFixation));
	$(window).on('resize', () => setTimeout(updateMaxScaleX));
	$(window).on('resize', () => setTimeout(resizeBackground));
	$(document).on('scroll', throttle(updateFixation, 100));
	$(document).on('scroll', throttle(resizeBackground, 100));
}

export default function Header(data) {
	const el = $(data.header).first();
	const inner = $(data.inner).first();
	const bg = $(data.bg).first();
	const fixedMod = data.fixedMod || 'header--fixed';

	makeSticky({
		el, inner, bg, fixedMod,
	});
}
