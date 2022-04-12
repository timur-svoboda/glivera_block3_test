import gsap from 'gsap';
import throttle from 'lodash.throttle';

export default class Header {
	constructor(data) {
		// header
		this.header = document.querySelector(data.header);
		this.background = document.querySelector(data.background);
		this.headerY = data.headerY;
		this.fixedClass = data.fixedClass || 'header--fixed';
		this.backgroundDuration = data.duration || 0.3;

		this.updateFixed = this.updateFixed.bind(this);

		const throttledUpdateFixed = throttle(this.updateFixed, 100);

		document.addEventListener('scroll', () => throttledUpdateFixed());
		window.addEventListener('resize', () => this.resizeBackground());

		// burger
		this.burger = document.querySelector(data.burger);
		this.burgerTop = document.querySelector(data.burgerTop);
		this.burgerCenter = document.querySelector(data.burgerCenter);
		this.burgerBottom = document.querySelector(data.burgerBottom);
		this.burgerLineHeight = data.burgerLineHeight;
		this.distanceBetweenBurgerLines = data.distanceBetweenBurgerLines;
		this.burgerStepDuration = data.burgerStepDuration || 0.2;

		this.tlBurgerTop = gsap.timeline();
		this.tlBurgerTop.to(this.burgerTop, {
			duration: this.burgerStepDuration,
			y: this.burgerLineHeight + this.distanceBetweenBurgerLines,
			ease: 'power0',
		});
		this.tlBurgerTop.to(this.burgerTop, {
			duration: this.burgerStepDuration,
			rotation: 45,
		});

		this.tlBurgerCenter = gsap.timeline();
		this.tlBurgerCenter.to(this.burgerCenter, {
			duration: this.burgerStepDuration,
			opacity: 0,
			ease: 'power0',
		});

		this.tlBurgerBottom = gsap.timeline();
		this.tlBurgerBottom.to(this.burgerBottom, {
			duration: this.burgerStepDuration,
			y: -(this.burgerLineHeight + this.distanceBetweenBurgerLines),
			ease: 'power0',
		});
		this.tlBurgerBottom.to(this.burgerBottom, {
			duration: this.burgerStepDuration,
			rotation: -45,
		});

		this.tlBurger = gsap.timeline({ paused: true });
		this.tlBurger
			.add(this.tlBurgerTop)
			.add(this.tlBurgerCenter, '<')
			.add(this.tlBurgerBottom, '<');

		this.burgerClickHandler = this.burgerClickHandler.bind(this);

		this.burger.addEventListener('click', this.burgerClickHandler);

		// mobile menu
		this.menu = document.querySelector(data.menu);
		this.menuCross = document.querySelector(data.menuCross);
		this.menuOpenClass = data.menuOpenClass || 'mobile_menu--open';

		this.menuClickHandler = this.menuClickHandler.bind(this);
		this.menuCrossClickHandler = this.menuCrossClickHandler.bind(this);

		this.menu.addEventListener('click', this.menuClickHandler);
		this.menuCross.addEventListener('click', this.menuCrossClickHandler);
	}

	updateFixed() {
		const isOutOfSight = window.scrollY >= this.headerY;
		const isFixed = this.header.classList.contains(this.fixedClass);

		if (isOutOfSight && !isFixed) {
			this.header.classList.add(this.fixedClass);

			this.resizeBackground();
		} else if (!isOutOfSight && isFixed) {
			this.header.classList.remove(this.fixedClass);

			this.resizeBackground();
		}
	}

	resizeBackground() {
		const isFixed = this.header.classList.contains(this.fixedClass);

		if (isFixed) {
			const backgroundStyles = window.getComputedStyle(this.background);
			const borderRadius = parseFloat(backgroundStyles.borderRadius);

			const scaleX = (document.body.clientWidth + borderRadius) / this.background.clientWidth;

			gsap.to(this.background, { scaleX, duration: this.backgroundDuration });
		} else {
			gsap.to(this.background, { scaleX: 1, duration: this.backgroundDuration });
		}
	}

	burgerClickHandler() {
		if (this.burger.classList.contains('burgerCrossed')) {
			this.burger.classList.remove('burgerCrossed');

			this.tlBurger.reverse();

			this.menu.classList.remove(this.menuOpenClass);
		} else {
			this.burger.classList.add('burgerCrossed');

			this.tlBurger.play();

			this.menu.classList.add(this.menuOpenClass);
		}
	}

	menuClickHandler(event) {
		if (event.target === event.currentTarget) {
			this.menu.classList.remove(this.menuOpenClass);

			this.burger.classList.remove('burgerCrossed');

			this.tlBurger.reverse();
		}
	}

	menuCrossClickHandler() {
		this.menu.classList.remove(this.menuOpenClass);

		this.burger.classList.remove('burgerCrossed');

		this.tlBurger.reverse();
	}
}
