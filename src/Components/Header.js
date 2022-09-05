import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header-wrapper'>
      <nav className="nav-wrapper">
        <Link to="/">Start</Link>
        <Link to="/courses">Kurser</Link>
        <Link to="/events">Event</Link>
        <Link to="/shop">Butik</Link>
      </nav>
    </header>
  )
}

export default Header