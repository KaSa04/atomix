import { useState, useEffect } from "react";
import { data } from '../services/data';
import { evaluarPar } from '../services/bondLogic';
import AtomDiagram from '../components/AtomDiagram';
import '../css/Simulator.css';

const elementos = data.slice(1);
const buscar = (symbol) => elementos.find(el => el.symbol === symbol);

const ejemplos = [
    ['Na', 'Cl'], ['Ca', 'O'], ['Mg', 'O'], ['K', 'Cl'], ['Li', 'F'], ['Ba', 'S'],
];

function posicionElectronDonante(shells, centroX, centroY) {
    const radioBase = 26;
    const espacioEntreCapas = 22;
    const ultimaCapaIndex = shells.length - 1;
    const radio = radioBase + ultimaCapaIndex * espacioEntreCapas;
    const angulo = -Math.PI / 2;
    return {
        x: centroX + radio * Math.cos(angulo),
        y: centroY + radio * Math.sin(angulo),
    };
}

function Simulator() {
    const [elemento1, setElemento1] = useState(buscar("Na"));
    const [elemento2, setElemento2] = useState(buscar("Cl"));
    const [fase, setFase] = useState("inicial"); // 'inicial' | 'transito' | 'final'

    const resultado = evaluarPar(elemento1, elemento2);

    useEffect(() => {
        setFase("inicial");
    }, [elemento1, elemento2]);

    useEffect(() => {
        if (fase !== "transito") return;
        const timer = setTimeout(() => setFase("final"), 1000);
        return () => clearTimeout(timer);
    }, [fase]);

    const simular = () => {
        if (resultado.compatible) setFase("transito");
    };

    const reiniciar = () => setFase("inicial");

    const cargarEjemplo = ([s1, s2]) => {
        setElemento1(buscar(s1));
        setElemento2(buscar(s2));
    };

    const centroMetalX = 160, centroNoMetalX = 440, centroY = 170;

    // Si el par es compatible, el que dona va siempre a la izquierda
    const atomoIzq = resultado.compatible ? resultado.metal : elemento1;
    const atomoDer = resultado.compatible ? resultado.noMetal : elemento2;

    const shellsIzqAntes = [...(atomoIzq.shells ?? [])];
    const shellsDerAntes = [...(atomoDer.shells ?? [])];

    let shellsIzqDespues = shellsIzqAntes;
    let shellsDerDespues = shellsDerAntes;
    if (resultado.compatible) {
        shellsIzqDespues = shellsIzqAntes.slice(0, -1);
        shellsDerDespues = [...shellsDerAntes];
        shellsDerDespues[shellsDerDespues.length - 1] += resultado.electronesTransferidos;
    }

    const mostrandoDespues = fase === "final";
    const shellsIzqMostrados = mostrandoDespues ? shellsIzqDespues : shellsIzqAntes;
    const shellsDerMostrados = mostrandoDespues ? shellsDerDespues : shellsDerAntes;

    const puntoDestino = resultado.compatible
        ? posicionElectronDonante(shellsDerDespues, centroNoMetalX, centroY)
        : null;

    const n = resultado.compatible ? resultado.electronesTransferidos : 0;
    const plural = n === 1 ? "" : "s";

    let pista = "Pick a pair and press Simulate.";
    if (!resultado.compatible) pista = "These two can't bond with an electron jump.";
    else if (fase === "inicial") pista = "Press Simulate to watch the electron jump!";
    else if (fase === "transito") pista = "The electron is on the move…";
    else pista = "Done! Both atoms are now ions with opposite charges.";

    return (
        <div className="simulador">
            <h1 className="pagina-titulo">Bond Simulator</h1>
            <p className="pagina-descripcion">
                Pick two elements and watch the electron jump from one atom to the other.
            </p>

            <div className="simulador-layout">
                <aside className="simulador-panel">
                    <h2 className="panel-titulo">Pick your atoms</h2>

                    <div className="panel-selectores">
                        <div className="selector-grupo">
                            <label htmlFor="sim-elemento1">Element 1</label>
                            <select
                                id="sim-elemento1"
                                value={elemento1.number}
                                onChange={(e) => setElemento1(elementos.find(el => el.number === Number(e.target.value)))}
                            >
                                {elementos.map(el => (
                                    <option key={el.number} value={el.number}>{el.name} ({el.symbol})</option>
                                ))}
                            </select>
                        </div>

                        <div className="selector-grupo">
                            <label htmlFor="sim-elemento2">Element 2</label>
                            <select
                                id="sim-elemento2"
                                value={elemento2.number}
                                onChange={(e) => setElemento2(elementos.find(el => el.number === Number(e.target.value)))}
                            >
                                {elementos.map(el => (
                                    <option key={el.number} value={el.number}>{el.name} ({el.symbol})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <span className="ejemplos-etiqueta">Try one of these</span>
                        <div className="ejemplos">
                            {ejemplos.map(([a, b]) => (
                                <button
                                    key={a + b}
                                    type="button"
                                    className="ejemplo-chip"
                                    onClick={() => cargarEjemplo([a, b])}
                                >
                                    {a} + {b}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`estado ${resultado.compatible ? 'ok' : 'no'}`}>
                        {!resultado.compatible ? (
                            <>
                                <span className="estado-etiqueta">Can't bond yet</span>
                                <p>{resultado.razon}</p>
                            </>
                        ) : fase === "final" ? (
                            <>
                                <span className="estado-etiqueta">Bond formed!</span>
                                <div className="resultado-formula">{resultado.formula}</div>
                                {resultado.chemicalName && (
                                    <p className="resultado-nombre">{resultado.chemicalName}</p>
                                )}
                                {resultado.commonName && (
                                    <p className="resultado-apodo">Also known as: {resultado.commonName}</p>
                                )}
                            </>
                        ) : (
                            <>
                                <span className="estado-etiqueta">Supported pair</span>
                                <p>
                                    {resultado.metal.name} gives {n} electron{plural} to {resultado.noMetal.name}.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="simulador-controles">
                        {fase === "inicial" ? (
                            <button
                                className="btn-simular"
                                onClick={simular}
                                disabled={!resultado.compatible}
                            >
                                ▶ Simulate
                            </button>
                        ) : (
                            <button className="btn-reset" onClick={reiniciar}>↺ Reset</button>
                        )}
                    </div>

                    <p className="simulador-beta">
                        Beta Version: only a limited set of elements with simple, fixed valence are supported.
                    </p>
                </aside>

                <section className="simulador-canvas">
                    <svg viewBox="0 0 600 320" className="simulador-svg">
                        <AtomDiagram
                            elemento={atomoIzq}
                            shells={shellsIzqMostrados}
                            centroX={centroMetalX}
                            centroY={centroY}
                            carga={mostrandoDespues && resultado.compatible ? n : 0}
                            colorNucleo="#a78bfa"
                        />

                        <AtomDiagram
                            elemento={atomoDer}
                            shells={shellsDerMostrados}
                            centroX={centroNoMetalX}
                            centroY={centroY}
                            carga={mostrandoDespues && resultado.compatible ? -n : 0}
                            colorNucleo="#60a5fa"
                        />

                        {fase === "transito" && resultado.compatible &&
                            Array.from({ length: n }).map((_, i) => (
                                <circle
                                    key={`viajero-${i}`}
                                    cx={puntoDestino.x}
                                    cy={puntoDestino.y}
                                    r="4"
                                    fill="#fbbf24"
                                    className="electron-viajero"
                                />
                            ))
                        }
                    </svg>
                    <p className="simulador-pista">{pista}</p>
                </section>
            </div>
        </div>
    );
}

export default Simulator;