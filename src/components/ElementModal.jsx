import { useEffect } from 'react';
import '../css/ElementModal.css';


function ElementModal({ elemento, alCerrar }) {
    useEffect(() => {
        const cerrarConEsc = (e) => e.key === "Escape" && alCerrar();
        document.addEventListener("keydown", cerrarConEsc);
        return () => document.removeEventListener("keydown", cerrarConEsc);
    }, [alCerrar]);


    if (!elemento) return null;

    return (
        <div className="modal-overlay" onClick={alCerrar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-cerrar" onClick={alCerrar}>×</button>

                <div className={`modal-header ${elemento.category.split(' ')[0]}`}>
                    <span className="modal-numero">{elemento.number}</span>
                    <h2 className="modal-simbolo">{elemento.symbol}</h2>
                    <h3 className="modal-nombre">{elemento.name}</h3>
                    <p className="modal-categoria">{elemento.category}</p>
                </div>

                <div className="modal-body">
                    {elemento.image?.url && (
                        <img
                            src={elemento.image.url}
                            alt={elemento.image.title || elemento.name || elemento.image.title}
                            className="modal-imagen"
                        />
                    )}

                    <p className="modal-resumen">{elemento.summary}</p>

                    <div className="modal-datos">
                        <div className="dato"><span>Atomic mass</span><strong>{elemento.atomic_mass}</strong></div>
                        <div className="dato"><span>Phase</span><strong>{elemento.phase}</strong></div>
                        <div className="dato"><span>Density</span><strong>{elemento.density ?? "N/D"}</strong></div>
                        <div className="dato"><span>Melting point</span><strong>{elemento.melt ? `${elemento.melt} K` : "N/D"}</strong></div>
                        <div className="dato"><span>Boiling point</span><strong>{elemento.boil ? `${elemento.boil} K` : "N/D"}</strong></div>
                        <div className="dato"><span>Electronegativity</span><strong>{elemento.electronegativity_pauling ?? "N/D"}</strong></div>
                        <div className="dato"><span>Electron configuration</span><strong>{elemento.electron_configuration_semantic}</strong></div>
                        <div className="dato"><span>Discovered by</span><strong>{elemento.discovered_by ?? "N/D"}</strong></div>
                    </div>

                    {elemento.shells && (
                        <div className="modal-shells">
                            <span>Electron shells:</span> {elemento.shells.join(" - ")}
                        </div>
                    )}

                    {elemento.source && (
                        <a href={elemento.source} target="_blank" rel="noopener noreferrer" className="modal-fuente">
                            See more in Wikipedia →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElementModal;