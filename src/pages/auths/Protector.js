import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router'
import FloatingNavbar from '../../components/FloatingNavbar';

export default function Protector({ flag, moveToPageIndex }) {
	const location = useLocation();
	return (
		flag ?

			<Navigate to='/auth' replace={true} /> :
			<>
				<Outlet />
				{
					location.pathname !== "/register/level2" && location.pathname !== "/register/level1" && location.pathname !== "/requests" &&
					<FloatingNavbar moveToPageIndex={moveToPageIndex} />
				}
			</>
	);
}
