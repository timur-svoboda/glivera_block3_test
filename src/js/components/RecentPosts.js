import useContainerMQ from '../utils/useContainerMQ';

export default function RecentPosts(data) {
	const el = $(data.el).first();
	const baseClass = data.baseClass || 'recent_posts';
	const breakpoints = data.breakpoints || {
		point_1: 640,
	};

	useContainerMQ(el, baseClass, breakpoints);
}
