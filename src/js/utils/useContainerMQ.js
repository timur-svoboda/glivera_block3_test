export default function useContainerMQ(el, baseClass, breakpoints) {
	// Do nothing if there are no breakpoints
	if (!Object.entries(breakpoints).length) return;

	// Define closure variables
	let prevClasses = '';

	// Get current media query classes based on container width
	function getCurrentClasses() {
		const classes = [];
		Object.entries(breakpoints).forEach(([bpName, bpWidth]) => {
			const direction = (el.parent().width() < bpWidth) ? 'below' : 'above';
			classes.push(`${baseClass}--${direction}_${bpName}`);
		});
		return classes.sort().join(' ');
	}

	// Update classes if current classes differ
	function updateClasses() {
		const currentClasses = getCurrentClasses();

		if (prevClasses !== currentClasses) {
			el.removeClass(prevClasses);
			el.addClass(currentClasses);
			prevClasses = currentClasses;
		}
	}

	// Initialize
	updateClasses();

	// Update on resize
	$(window).resize('resize', updateClasses);
}
