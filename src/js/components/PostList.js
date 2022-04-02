import useContainerMQ from 'utils/useContainerMQ';

export default function PostList(data) {
	const el = $(data.el).first();
	const baseClass = data.baseClass || 'post_list';
	const breakpoints = data.breakpoints || {
		point_1: 700,
		point_2: 480,
	};

	useContainerMQ(el, baseClass, breakpoints);
}
