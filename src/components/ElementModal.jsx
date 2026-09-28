import { useEffect } from "react";
import '../css/ElementModal.css';

function ElementModal({ elemento, alCerrar }) {
    useEffect(() => {
        const cerrarConEsc = (e) => e.key === "Escape" && alCerrar();
        document.addEventListener("keydown", cerrarConEsc);
        return () => document.removeEventListener("keydown", cerrarConEsc);
    }, [alCerrar]);

    if (!elemento) return null;

    const datos = [
        { etiqueta: "Atomic mass", valor: elemento.atomic_mass },
        { etiqueta: "Phase", valor: elemento.phase },
        { etiqueta: "Density", valor: elemento.density },
        { etiqueta: "Melting point", valor: elemento.melt != null ? `${elemento.melt} K` : null },
        { etiqueta: "Boiling point", valor: elemento.boil != null ? `${elemento.boil} K` : null },
        { etiqueta: "Electronegativity", valor: elemento.electronegativity_pauling },
        { etiqueta: "Electron configuration", valor: elemento.electron_configuration_semantic },
        { etiqueta: "Discovered by", valor: elemento.discovered_by },
    ];

    // Seguridad por si la categoría no existe o viene vacía
    const categoriaClase = elemento.category ? elemento.category.split(' ')[0] : '';

    return (
        <div className="modal-overlay" onClick={alCerrar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-cerrar" onClick={alCerrar} aria-label="Close">×</button>

                <div className={`modal-header ${categoriaClase}`}>
                    <span className="modal-numero">{elemento.number}</span>
                    <h2 className="modal-simbolo">{elemento.symbol}</h2>
                    <h3 className="modal-nombre">{elemento.name}</h3>
                    <p className="modal-categoria">{elemento.category}</p>
                </div>

                <div className="modal-body">
                    {elemento.image?.url && (
                        <img
                            src={elemento.image.url}
                            alt={elemento.image.title || elemento.name}
                            className="modal-imagen"
                        />
                    )}

                    <p className="modal-resumen">{elemento.summary}</p>

                    <details className="modal-detalles">
                        <summary>Specific Information</summary>

                        <div className="modal-detalles-contenido">
                            <div className="modal-datos">
                                {datos.map(({ etiqueta, valor }) => (
                                    <div className="dato" key={etiqueta}>
                                        <span>{etiqueta}</span>
                                        <strong>{valor ?? "N/A"}</strong>
                                    </div>
                                ))}
                            </div>

                            {elemento.shells && (
                                <div className="modal-shells">
                                    <span>Electron shells:</span> {elemento.shells.join(" - ")}
                                </div>
                            )}
                        </div>
                    </details>

                    {elemento.source && (
                        <a
                            href={elemento.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="modal-fuente"
                        >
                            See more in Wikipedia →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElementModal;