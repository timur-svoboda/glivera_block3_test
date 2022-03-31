import gsap from 'gsap';
import throttle from 'lodash.throttle';

export default class Header {
	constructor(data) {
		this.document = $(document);
		this.el = $(data.header).first();
		this.inner = $(data.inner).first();
		this.bg = $(data.bg).first();
		this.fixedMod = data.fixedMod;
		this.borderRadius = data.borderRadius;

		// Bind methods
		this.calcInnerOffsetTop = this.calcInnerOffsetTop.bind(this);
		this.toggleFixed = this.toggleFixed.bind(this);
		this.calcMaxScaleX = this.calcMaxScaleX.bind(this);
		this.resizeBg = this.resizeBg.bind(this);
		this.update = this.update.bind(this);

		// Initialize
		this.update();

		// Scroll handlers
		this.document.on('scroll', throttle(this.toggleFixed, 100));
		this.document.on('scroll', throttle(this.resizeBg, 100));

		// Resize handlers
		$(window).on('resize', this.update);
	}

	update() {
		this.calcInnerOffsetTop();
		this.toggleFixed();
		this.calcMaxScaleX();
		this.resizeBg();
	}

	calcInnerOffsetTop() {
		this.innerOffsetTop = (this.el.height() - this.inner.height()) / 2;
	}

	isFixed() {
		return this.el.hasClass(this.fixedMod);
	}

	toggleFixed() {
		const isFixed = this.isFixed();
		const isInnerTouchViewport = this.document.scrollTop() >= this.innerOffsetTop;

		if (!isFixed && isInnerTouchViewport) {
			this.el.addClass(this.fixedMod);
		} else if (isFixed && !isInnerTouchViewport) {
			this.el.removeClass(this.fixedMod);
		}
	}

	calcMaxScaleX() {
		this.maxScaleX = (this.document.width() + this.borderRadius) / this.bg.width();
	}

	resizeBg() {
		if (this.isFixed()) {
			gsap.to(this.bg.get(0), { scale: this.maxScaleX, duration: 0.3 });
		} else {
			gsap.to(this.bg.get(0), { scale: 1, duration: 0.3 });
		}
	}
}
