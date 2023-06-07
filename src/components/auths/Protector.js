import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import NavigationBar from '../NavigationBar';
import Sidebar from '../SidebarPopup';
import FloatingNavbar from '../FloatingNavbar';

export default function Protector() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/auth');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <NavigationBar />
            <Outlet />
            <Sidebar />
            <FloatingNavbar />
        </>
    )
}
