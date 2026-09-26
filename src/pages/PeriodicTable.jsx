import { useState } from "react";
import { Link } from 'react-router-dom';
import { data } from '../services/data';
import ElementModal from '../components/ElementModal';
import Leyenda from "../components/Legend";
import '../css/PeriodicTable.css';

function PeriodicTable() {
    const [seleccionado, setSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [categoriasActivas, setCategoriasActivas] = useState([]);

    const manejarSeleccion = (elemento) => {
        setSeleccionado(elemento);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setSeleccionado(null);
    };

    const alternarCategoria = (clase) => {
        setCategoriasActivas((prev) => 
            prev.includes(clase) ? prev.filter((c) => c !== clase) : [...prev, clase]
        );
    };

    const coincide = (elemento) => {
        const clase = elemento.category.split(' ')[0];

        const coincideTexto = !busqueda.trim() || (() => {
            const texto = busqueda.toLowerCase();
            return (
                elemento.name.toLowerCase().includes(texto) ||
                elemento.symbol.toLowerCase().includes(texto) ||
                String(elemento.number) === texto
            );
        })();

        const coincideCategoria = categoriasActivas.length === 0 || categoriasActivas.includes(clase);

        return coincideTexto && coincideCategoria;
    };

    return (
        <div className="container">

            <aside className="sidebar">
                <Link to="/" className="volver-atomix">← Back to Atomix</Link>
                <input
                    type="text"
                    className="buscador"
                    placeholder="Search by name, symbol or number..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <Leyenda
                    categoriasActivas={categoriasActivas}
                    alSeleccionar={alternarCategoria}
                />
            </aside>


            <div className="tabla-wrapper">
                <div className="periodic-table">
                    {data.slice(1).map((element) => {
                        const visible = coincide(element);

                        return (
                            <div
                                key={element.number}
                                className={`element-card ${element.category.split(' ')[0]} ${!visible ? 'atenuado' : ''}`}
                                onClick={() => manejarSeleccion(element)}
                                style={{
                                    gridColumn: element.xpos,
                                    gridRow: element.ypos
                                }}
                            >
                                <div className="element-number">{element.number}</div>
                                <div className="element-symbol">{element.symbol}</div>
                                <div className="element-name">{element.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {modalAbierto && (
                <ElementModal elemento={seleccionado} alCerrar={cerrarModal} />
            )}

        </div>
    )
}

export default PeriodicTable;