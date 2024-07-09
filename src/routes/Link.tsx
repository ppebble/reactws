import React, { MouseEvent, ReactNode } from 'react';

interface LinkProps {
	href: string;
	children: ReactNode;
}

const Link = ({ href, children }: LinkProps) => {
	const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		window.history.pushState({}, '', href);
		console.log(window.location);
		const navEvent = new PopStateEvent('popstate');
		window.dispatchEvent(navEvent);
	};
	return (
		<a href={href} onClick={onClick}>
			{children}
		</a>
	);
};

export default Link;
