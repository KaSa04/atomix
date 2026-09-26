import { Link } from 'react-router-dom';
import '../css/Landing.css';

const herramientas = [
    { ruta: '/periodic-table', titulo: 'Interactive Periodic Table', descripcion: 'Explore all 118 elements — click any card to see detailed properties.', icono: '🧪' },
    { ruta: '/calculator', titulo: 'Electronegativity Calculator', descripcion: 'Pick two elements and find the electronegativity difference and bond type.', icono: '⚡' },
    { ruta: '/simulator', titulo: 'Bond Simulator', descripcion: 'Watch electrons transfer between atoms and see the compound they form.', icono: '🔬' },
];

function Landing() {
    return (
        <div className="landing">
            <header className="landing-hero">
                <h1 className="landing-titulo">Atomix</h1>
                <p className="landing-descripcion">
                    A chemistry toolkit for exploring elements, calculating bond types,
                    and visualizing how atoms connect.
                </p>
            </header>

            <div className="landing-cards">
                {herramientas.map(({ ruta, titulo, descripcion, icono }) => (
                    <Link key={ruta} to={ruta} className="landing-card">
                        <span className="landing-card-icono">{icono}</span>
                        <h2 className="landing-card-titulo">{titulo}</h2>
                        <p className="landing-card-descripcion">{descripcion}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Landing;