import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function AppHeader() {


    return (
        <header className="app-header">
            <h1>MisterToy</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}

