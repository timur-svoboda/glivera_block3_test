import useContainerMQ from '../utils/useContainerMQ';

export default function Post(data) {
	const el = $(data.el).first();
	const baseClass = data.baseClass || 'post';
	const breakpoints = data.breakpoints || {
		point_1: 780,
		point_2: 700,
		point_3: 320,
	};

	useContainerMQ(el, baseClass, breakpoints);

	// Adapt font size based on container width
	const fontSizeK = data.fontSizeK || 0.0168;
	const fontSizeB = data.fontSizeB || 13.8;

	function adaptFontSize() {
		const containerWidth = el.parent().width();

		let fontSize = '';
		if (containerWidth >= breakpoints.point_3 && containerWidth < breakpoints.point_2) {
			fontSize = fontSizeK * containerWidth + fontSizeB;
		}

		el.find(data.titleSelector).css({ fontSize });
	}

	adaptFontSize();

	$(window).on('resize', adaptFontSize);
}
