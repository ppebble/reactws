import React, { ReactNode, useEffect, useState } from 'react';

interface RouteProps {
	path: string;
	children: ReactNode;
}

export const Route = ({ path, children }: RouteProps) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		// listen for popstate event
		window.addEventListener('popstate', onLocationChange);

		// clean up event listener
		return () => {
			window.removeEventListener('popstate', onLocationChange);
		};
	}, []);

	return currentPath === path ? <> {children} </> : null;
};
