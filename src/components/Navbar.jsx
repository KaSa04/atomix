import { Link, NavLink, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/periodic-table', label: 'Periodic Table' },
    { to: '/calculator', label: 'Calculator' },
    { to: '/simulator', label: 'Simulator' },
];

function Navbar() {
    const { pathname } = useLocation();
    const ancha = pathname === '/periodic-table';

    return (
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
            </div>
        </nav>
    );
}

export default Navbar;