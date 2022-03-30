export default class MobileMenu {
	constructor(data) {
		this.el = $(data.menu).first();
		this.cross = $(data.cross).first();
		this.openMod = data.openMod;

		this.closedEvent = jQuery.Event('closed');

		this.el.on('click', (e) => {
			if (!this.el.find(e.target).length) {
				this.close();
			}
		});

		this.cross.on('click', () => this.close());
	}

	open() {
		this.el.addClass(this.openMod);
	}

	close() {
		this.el.removeClass(this.openMod);
		this.el.trigger(this.closedEvent);
	}
}
