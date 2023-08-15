import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router'
import Navbar from '../../components/Navbar';

const Protector = ({ flag, moveToPageIndex }) =>{
	const location = useLocation();
	return (
		flag ?

			<Navigate to='/auth' replace={true} /> :
			<>
				<Outlet />
				{
					location.pathname !== "/register/level2" && location.pathname !== "/register/level1" &&
					<Navbar moveToPageIndex={moveToPageIndex} />
				}
			</>
	);
}

export default Protector;