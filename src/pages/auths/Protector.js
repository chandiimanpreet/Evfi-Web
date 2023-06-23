import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router'
import FloatingNavbar from '../../components/FloatingNavbar';

export default function Protector(props) {
	const location = useLocation();

	return (
		!props.flag ?

			<Navigate to='/auth' replace={true} /> :
			<>
				<Outlet />
				{
					location.pathname !== "/register" &&
					<FloatingNavbar setDirection={props.setDirection} />
				}
			</>
	);
}
