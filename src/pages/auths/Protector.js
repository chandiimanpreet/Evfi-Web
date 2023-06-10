import React from 'react'
import { Outlet,  useLocation, Navigate } from 'react-router'
import FloatingNavbar from '../../components/FloatingNavbar';

export default function Protector(props) {
    const location = useLocation();

    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //         navigate('/auth');
    //     }
    //     // eslint-disable-next-line
    // }, [])
    if (!props.flag) {
        return <Navigate to='/auth' replace={true}/>
    } else {
        if (location.pathname === "/register") {
            return (
                <Outlet />
            )
        } else {

            return (
                <>
                    <Outlet />
                    <FloatingNavbar />
                </>
            )
        }
    }
}
