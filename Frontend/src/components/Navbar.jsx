import React from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const location = useLocation()

    return (
        <header className="study-navbar">
            <div className="study-navbar__left">
                <Link to="/" className="study-navbar__brand">
                    <span className="brand-icon">&lt;/&gt;</span>
                    <span className="brand-title">
                        Qraft<span className="highlight">AI</span>
                    </span>
                </Link>

                <nav className="study-navbar__nav-links">
                    <Link
                        to="/"
                        className={`study-navbar__link ${location.pathname === '/' ? 'study-navbar__link--active' : ''}`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        Prep Sheet Studio
                    </Link>
                </nav>
            </div>

            <div className="study-navbar__right">
                {user && (
                    <div className="study-navbar__user-badge" title={user.email}>
                        <span className="user-avatar">
                            {(user.username || user.email || 'C')[0].toUpperCase()}
                        </span>
                        <span className="user-name">
                            {user.username || user.email?.split('@')[0]}
                        </span>
                    </div>
                )}

                {user && (
                    <button
                        onClick={handleLogout}
                        className="study-navbar__logout-btn"
                        title="Sign Out"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Exit
                    </button>
                )}
            </div>
        </header>
    )
}

export default Navbar
