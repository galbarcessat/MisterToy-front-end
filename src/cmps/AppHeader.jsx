import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import toyLogo from '../assets/img/toyLogo.png'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function AppHeader() {


    return (
        <header className="app-header">
            <div className='logo-container'>
                <img className='toy-logo' src={toyLogo} alt="shop logo" />
                <h1 className='toy-logo-txt'>MisterToy</h1>
            </div>
            <nav className='header-nav-links'>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}

