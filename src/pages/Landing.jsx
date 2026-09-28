import { Link } from 'react-router-dom';
import '../css/Landing.css';

const herramientas = [
    {
        ruta: '/periodic-table',
        titulo: 'Interactive Periodic Table',
        descripcion: 'Explore all 118 elements — click any card to see detailed properties.',
        icono: '🧪',
        color: 'var(--accent)',
        cta: 'Open table',
    },
    {
        ruta: '/calculator',
        titulo: 'Electronegativity Calculator',
        descripcion: 'Pick two elements and find the electronegativity difference and bond type.',
        icono: '⚡',
        color: 'var(--accent-2)',
        cta: 'Open calculator',
    },
    {
        ruta: '/simulator',
        titulo: 'Bond Simulator',
        descripcion: 'Watch electrons jump between atoms and see the compound they form.',
        icono: '🔬',
        color: 'var(--accent-3)',
        cta: 'Open simulator',
    },
];

function Landing() {
    return (
        <div className="landing">
            <header className="landing-hero">
                <span className="landing-badge">Chemistry made playful</span>
                <h1 className="landing-titulo">
                    Explore elements, bonds &amp; atoms with <span className="landing-marca">Atomix</span>!
                </h1>
                <p className="landing-descripcion">
                    A chemistry toolkit for exploring elements, calculating bond types,
                    and visualizing how atoms connect.
                </p>
                <Link to="/periodic-table" className="landing-boton">Start exploring →</Link>
            </header>

            <div className="landing-cards">
                {herramientas.map(({ ruta, titulo, descripcion, icono, color, cta }, i) => (
                    <Link
                        key={ruta}
                        to={ruta}
                        className="landing-card"
                        style={{ '--card-color': color, animationDelay: `${i * 0.08}s` }}
                    >
                        <span className="landing-card-icono">{icono}</span>
                        <h2 className="landing-card-titulo">{titulo}</h2>
                        <p className="landing-card-descripcion">{descripcion}</p>
                        <span className="landing-card-cta">{cta} →</span>
                    </Link>
                ))}
            </div>

            <footer className="landing-footer">
                Element data from Wikipedia. Images via Wikimedia Commons.
            </footer>
        </div>
    );
}

export default Landing;