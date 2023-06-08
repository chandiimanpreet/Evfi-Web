import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import NavigationBar from '../../components/NavigationBar';
import Sidebar from '../../components/SidebarPopup';
import FloatingNavbar from '../../components/FloatingNavbar';

export default function Protector() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/auth');
        }
        // eslint-disable-next-line
    }, [])
    if (location.pathname === "/register") {
        return (
            <Outlet />
        )
    } else {

        return (
            <>
                <NavigationBar />
                <Outlet />
                <Sidebar />
                <FloatingNavbar />
            </>
        )
    }
}
