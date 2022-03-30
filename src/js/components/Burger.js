import gsap from 'gsap';

export default class Burger {
	constructor(data) {
		// Initialize properties
		this.el = $(data.burger).first();
		this.top = $(data.top).first();
		this.center = $(data.center).first();
		this.bottom = $(data.bottom).first();
		this.height = data.height;
		this.offset = data.offset;

		// Create animation
		const stepDuration = 0.2;

		const tlTop = gsap.timeline();
		tlTop.to(this.top.get(0), { duration: stepDuration, y: this.height + this.offset, ease: 'power0' });
		tlTop.to(this.top.get(0), { duration: stepDuration, rotation: 45 });

		const tlCenter = gsap.timeline();
		tlCenter.to(this.center.get(0), { duration: stepDuration, opacity: 0, ease: 'power0' });

		const tlBottom = gsap.timeline();
		tlBottom.to(this.bottom.get(0), { duration: stepDuration, y: -(this.height + this.offset), ease: 'power0' });
		tlBottom.to(this.bottom.get(0), { duration: stepDuration, rotation: -45 });

		this.tl = gsap.timeline({ paused: true, reversed: true })
			.add(tlTop)
			.add(tlCenter, '<')
			.add(tlBottom, '<');

		// Add click handler
		this.el.on('click', () => this.toggle());
	}

	toggle() {
		if (this.tl.reversed()) {
			this.cross();
		} else {
			this.uncross();
		}
	}

	cross() {
		this.tl.play();
	}

	uncross() {
		this.tl.reverse();
	}
}
