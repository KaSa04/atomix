import { Link } from 'react-router-dom';

function Simulator() {
    return (
        <div style={{ padding: 40, color: 'white' }}>
            <Link to="/" className="volver-atomix">← Back to Atomix</Link>
            <h1>Electronegativity Calculator</h1>
            <p>Coming soon...</p>
        </div>
    );
}

export default Simulator;