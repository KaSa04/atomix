import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const links = [
    { to: '/', label: 'Home', end: true, icon: '🏠' },
    { to: '/periodic-table', label: 'Periodic Table', icon: '🧪' },
    { to: '/calculator', label: 'Calculator', icon: '🧮' },
    { to: '/simulator', label: 'Simulator', icon: '⚛️' },
];

function Navbar() {
    const { pathname } = useLocation();
    const ancha = pathname === '/periodic-table';

    // Estado para sincronizar el modo actual
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    const toggleDarkMode = () => {
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setIsDark(!isDark);
    };

    return (
        <>
            {/* Navbar tradicional para Web */}
            <nav className={`navbar ${ancha ? 'navbar-ancha' : ''}`}>
                <Link to="/" className="navbar-brand">
                    <span className="navbar-brand-icono">⚛</span>
                    <span className="navbar-brand-texto">
                        <strong>Atomix</strong>
                        <small>Chemistry for kids</small>
                    </span>
                </Link>

                <div className="navbar-links">
                    {links.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) => `navbar-link ${isActive ? 'activo' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}

                    {/* Interruptor deslizante estilo píldora para Web */}
                    <button 
                        onClick={toggleDarkMode} 
                        className={`theme-switch ${isDark ? 'dark' : 'light'}`}
                        aria-label="Toggle theme"
                    >
                        <span className="theme-switch-handle">
                            {isDark ? '🌙' : '☀️'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Barra de navegación inferior flotante para Celulares */}
            <nav className="navbar-movil">
                {links.map(({ to, label, end, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) => `navbar-movil-link ${isActive ? 'activo' : ''}`}
                    >
                        <span className="navbar-movil-icono">{icon}</span>
                        <span className="navbar-movil-label">{label}</span>
                    </NavLink>
                ))}

                {/* Botón dinámico para Móvil */}
                <button 
                    onClick={toggleDarkMode} 
                    className="navbar-movil-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <span className="navbar-movil-icono">{isDark ? '🌙' : '☀️'}</span>
                    <span className="navbar-movil-label">{isDark ? 'Dark' : 'Light'}</span>
                </button>
            </nav>
        </>
    );
}

export default Navbar;