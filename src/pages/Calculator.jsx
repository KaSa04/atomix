import { useState } from "react";
import { data } from '../services/data';
import '../css/Calculator.css';

const elementos = data.slice(1);

function determinarEnlace(diferencia) {
    if (diferencia < 0.4) {
        return {
            tipo: "Nonpolar Covalent Bond",
            clase: "covalente-no-polar",
            descripcion: "Electrons are shared almost equally between both atoms — neither one pulls harder than the other.",
        };
    } else if (diferencia <= 1.7) {
        return {
            tipo: "Polar Covalent Bond",
            clase: "covalente-polar",
            descripcion: "Electrons are shared unevenly, spending more time near the more electronegative atom.",
        };
    } else {
        return {
            tipo: "Ionic Bond",
            clase: "ionico",
            descripcion: "One atom pulls so strongly that an electron transfers completely, forming charged ions that attract each other.",
        };
    }
}

function Calculator() {
    const [elemento1, setElemento1] = useState(elementos[0]);
    const [elemento2, setElemento2] = useState(elementos[7]);

    const en1 = elemento1.electronegativity_pauling;
    const en2 = elemento2.electronegativity_pauling;

    const sinDatos = en1 == null || en2 == null;
    const diferencia = sinDatos ? null : Math.abs(en1 - en2).toFixed(2);
    const resultado = sinDatos ? null : determinarEnlace(parseFloat(diferencia));

    return (
        <div className="calculadora-layout">
            <div className="calculadora">
                <h1 className="pagina-titulo">Electronegativity Calculator</h1>
                <p className="pagina-descripcion">
                    Pick two elements to find their electronegativity difference and predicted bond type.
                </p>

                <div className="selectores">
                    <div className="selector-grupo">
                        <label htmlFor="elemento1">First element</label>
                        <select
                            id="elemento1"
                            value={elemento1.number}
                            onChange={(e) => setElemento1(elementos.find(el => el.number === Number(e.target.value)))}
                        >
                            {elementos.map((el) => (
                                <option key={el.number} value={el.number}>
                                    {el.name} ({el.symbol})
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="selector-separador">+</span>

                    <div className="selector-grupo">
                        <label htmlFor="elemento2">Second element</label>
                        <select
                            id="elemento2"
                            value={elemento2.number}
                            onChange={(e) => setElemento2(elementos.find(el => el.number === Number(e.target.value)))}
                        >
                            {elementos.map((el) => (
                                <option key={el.number} value={el.number}>
                                    {el.name} ({el.symbol})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="calculadora-valores-individuales">
                    <div className="valor-individual">
                        <span>{elemento1.symbol}</span>
                        <strong>{en1 ?? "N/A"}</strong>
                    </div>
                    <div className="valor-individual">
                        <span>{elemento2.symbol}</span>
                        <strong>{en2 ?? "N/A"}</strong>
                    </div>
                </div>

                <div className="calculadora-resultado">
                    {sinDatos ? (
                        <p className="resultado-error">
                            Electronegativity data isn't available for one of these elements (common for synthetic/unstable elements), so a bond type can't be calculated.
                        </p>
                    ) : (
                        <>
                            <div className="resultado-diferencia">
                                <span>|EN({elemento1.symbol}) − EN({elemento2.symbol})|</span>
                                <strong>{diferencia}</strong>
                            </div>
                            <div className={`resultado-tipo ${resultado.clase}`}>
                                {resultado.tipo}
                            </div>
                            <p className="resultado-descripcion">{resultado.descripcion}</p>
                        </>
                    )}
                </div>

                <p className="calculadora-nota">
                    Classification based on the electronegativity difference rule (a simplified model
                    commonly used in introductory chemistry). Real bonds exist on a continuum, and some
                    compounds — like HF — are known exceptions to this rule.
                </p>
            </div>

            <aside className="teoria">
                <div className="teoria-header">
                    <span className="teoria-icono">📖</span>
                    <div>
                        <h2>Theory & Bonding Rules</h2>
                        <p className="teoria-subtitulo">Everything you need to know</p>
                    </div>
                </div>

                <div className="teoria-intro">
                    <h3>What is Electronegativity?</h3>
                    <p>
                        Electronegativity is how strongly an atom pulls shared electrons toward itself.
                        Atoms with high electronegativity (like Fluorine and Oxygen) attract shared
                        electrons very closely.
                    </p>
                </div>

                <h4 className="teoria-umbral-titulo">Bond Classification Thresholds</h4>

                <div className="teoria-umbral covalente-no-polar">
                    <div className="teoria-umbral-header">
                        <span className="dot"></span>
                        <strong>Nonpolar Covalent (&lt; 0.4)</strong>
                    </div>
                    <p>Equal sharing of electrons. Both atoms share the electron cloud fairly.</p>
                </div>

                <div className="teoria-umbral covalente-polar">
                    <div className="teoria-umbral-header">
                        <span className="dot"></span>
                        <strong>Polar Covalent (0.4 – 1.7)</strong>
                    </div>
                    <p>Unequal sharing — one atom pulls harder, creating a small charge imbalance.</p>
                </div>

                <div className="teoria-umbral ionico">
                    <div className="teoria-umbral-header">
                        <span className="dot"></span>
                        <strong>Ionic Bond (&gt; 1.7)</strong>
                    </div>
                    <p>An electron transfers completely, forming oppositely charged ions that attract.</p>
                </div>

                <div className="teoria-dato">
                    💡 <strong>Fun fact:</strong> Linus Pauling created this scale in 1932. Fluorine tops
                    the chart at 3.98 — the most electronegative element.
                </div>
            </aside>
        </div>
    );
}

export default Calculator;