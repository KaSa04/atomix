import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from '../services/data';
import { evaluarPar } from '../services/bondLogic';
import AtomDiagram from '../components/AtomDiagram';
import '../css/Simulator.css';

const elementos = data.slice(1);

// Calcula la posición del electrón que se transfiere (siempre el primero de la última capa)
function posicionElectronDonante(shells, centroX, centroY) {
    const radioBase = 26;
    const espacioEntreCapas = 22;
    const ultimaCapaIndex = shells.length - 1;
    const radio = radioBase + ultimaCapaIndex * espacioEntreCapas;
    const angulo = -Math.PI / 2; // primer electrón, arriba
    return {
        x: centroX + radio * Math.cos(angulo),
        y: centroY + radio * Math.sin(angulo),
    };
}

function Simulator() {
    const [elemento1, setElemento1] = useState(elementos.find(el => el.symbol === "Na"));
    const [elemento2, setElemento2] = useState(elementos.find(el => el.symbol === "Cl"));
    const [fase, setFase] = useState("inicial"); // 'inicial' | 'transito' | 'final'

    const resultado = evaluarPar(elemento1, elemento2);

    // Reinicia la animación cada vez que cambian los elementos elegidos
    useEffect(() => {
        setFase("inicial");
    }, [elemento1, elemento2]);

    const simular = () => {
        if (!resultado.compatible) return;
        setFase("transito");
        setTimeout(() => setFase("final"), 1000);
    };

    const reiniciar = () => setFase("inicial");

    // Posiciones fijas en el canvas SVG
    const centroMetalX = 160, centroNoMetalX = 440, centroY = 170;

    // Shells "antes" (antes de cualquier transferencia)
    const shellsMetalAntes = resultado.compatible ? [...resultado.metal.shells] : (elemento1.shells ?? []);
    const shellsNoMetalAntes = resultado.compatible ? [...resultado.noMetal.shells] : (elemento2.shells ?? []);

    // Shells "después" (solo tiene sentido si es compatible)
    let shellsMetalDespues = shellsMetalAntes;
    let shellsNoMetalDespues = shellsNoMetalAntes;
    if (resultado.compatible) {
        shellsMetalDespues = shellsMetalAntes.slice(0, -1); // pierde la última capa completa
        shellsNoMetalDespues = [...shellsNoMetalAntes];
        shellsNoMetalDespues[shellsNoMetalDespues.length - 1] += resultado.electronesTransferidos;
    }

    const mostrandoDespues = fase === "final";
    const shellsMetalMostrados = mostrandoDespues ? shellsMetalDespues : shellsMetalAntes;
    const shellsNoMetalMostrados = fase === "transito" ? shellsNoMetalAntes : (mostrandoDespues ? shellsNoMetalDespues : shellsNoMetalAntes);

    // Posición del/los electrón(es) viajero(s)
    const puntoOrigen = resultado.compatible ? posicionElectronDonante(shellsMetalAntes, centroMetalX, centroY) : null;
    const puntoDestino = resultado.compatible ? posicionElectronDonante(shellsNoMetalDespues, centroNoMetalX, centroY) : null;

    return (
        <div className="simulador">
            <Link to="/" className="volver-atomix">← Back to Atomix</Link>

            <h1 className="simulador-titulo">Bond Simulator</h1>
            <p className="simulador-descripcion">
                Pick two elements to see if they form an ionic bond, and watch the electron transfer happen.
            </p>
            
            <div className="simulador-beta">
                <p>⚗️ Beta: only a limited set of elements with simple, fixed valence are supported.</p>
                <p className="simulador-sugeridos">
                    Try: <strong>Na+Cl</strong>, <strong>Ca+O</strong>, <strong>Mg+O</strong>, <strong>K+Cl</strong>, <strong>Li+F</strong>, <strong>Ba+S</strong>
                </p>
            </div>

            <div className="simulador-selectores">
                <select
                    value={elemento1.number}
                    onChange={(e) => setElemento1(elementos.find(el => el.number === Number(e.target.value)))}
                >
                    {elementos.map(el => <option key={el.number} value={el.number}>{el.name} ({el.symbol})</option>)}
                </select>

                <span className="selector-separador">+</span>

                <select
                    value={elemento2.number}
                    onChange={(e) => setElemento2(elementos.find(el => el.number === Number(e.target.value)))}
                >
                    {elementos.map(el => <option key={el.number} value={el.number}>{el.name} ({el.symbol})</option>)}
                </select>
            </div>

            <div className="simulador-canvas-wrapper">
                <svg viewBox="0 0 600 320" className="simulador-svg">
                    <AtomDiagram
                        elemento={elemento1}
                        shells={shellsMetalMostrados}
                        centroX={centroMetalX}
                        centroY={centroY}
                        carga={mostrandoDespues && resultado.compatible ? resultado.electronesTransferidos : 0}
                        colorNucleo="#a78bfa"
                    />

                    <AtomDiagram
                        elemento={elemento2}
                        shells={shellsNoMetalMostrados}
                        centroX={centroNoMetalX}
                        centroY={centroY}
                        carga={mostrandoDespues && resultado.compatible ? -resultado.electronesTransferidos : 0}
                        colorNucleo="#60a5fa"
                    />

                    {/* Electrón(es) viajero(s), solo visibles durante la transición */}
                    {fase === "transito" && resultado.compatible &&
                        Array.from({ length: resultado.electronesTransferidos }).map((_, i) => (
                            <circle
                                key={`viajero-${i}`}
                                cx={puntoDestino.x}
                                cy={puntoDestino.y}
                                r="4"
                                fill="#fbbf24"
                                className="electron-viajero"
                                style={{ transformOrigin: `${puntoOrigen.x}px ${puntoOrigen.y}px` }}
                            />
                        ))
                    }
                </svg>
            </div>

            <div className="simulador-controles">
                {fase === "inicial" && (
                    <button
                        className="btn-simular"
                        onClick={simular}
                        disabled={!resultado.compatible}
                    >
                        ▶ Simulate
                    </button>
                )}
                {fase !== "inicial" && (
                    <button className="btn-reset" onClick={reiniciar}>↺ Reset</button>
                )}
            </div>

            <div className="simulador-resultado">
                {!resultado.compatible ? (
                    <p className="resultado-no-compatible">{resultado.razon}</p>
                ) : fase === "final" ? (
                    <div className="resultado-compatible">
                        <div className="resultado-formula">{resultado.formula}</div>
                        {resultado.chemicalName && (
                            <p className="resultado-nombre">{resultado.chemicalName}</p>
                        )}
                        {resultado.commonName && (
                            <p className="resultado-apodo">Also known as: {resultado.commonName}</p>
                        )}
                    </div>
                ) : (
                    <p className="resultado-pendiente">
                        Press "Simulate" to see the electron transfer between {elemento1.name} and {elemento2.name}.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Simulator;