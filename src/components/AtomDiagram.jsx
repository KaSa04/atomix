// Calcula las posiciones (x,y) de los electrones distribuidos uniformemente en un círculo
function posicionesElectrones(radio, cantidad, centroX, centroY) {
    const posiciones = [];
    for (let i = 0; i < cantidad; i++) {
        const angulo = (Math.PI * 2 * i) / cantidad - Math.PI / 2; // empieza arriba
        posiciones.push({
            x: centroX + radio * Math.cos(angulo),
            y: centroY + radio * Math.sin(angulo),
        });
    }
    return posiciones;
}

function AtomDiagram({ elemento, shells, centroX, centroY, carga, colorNucleo = "#60a5fa" }) {
    const radioBase = 26;
    const espacioEntreCapas = 22;

    return (
        <g>
            {/* Órbitas (círculos de las capas) */}
            {shells.map((_, i) => (
                <circle
                    key={`orbita-${i}`}
                    cx={centroX}
                    cy={centroY}
                    r={radioBase + i * espacioEntreCapas}
                    fill="none"
                    stroke="#4c4a8a"
                    strokeWidth="1"
                />
            ))}

            {/* Núcleo */}
            <circle cx={centroX} cy={centroY} r="16" fill={colorNucleo} />
            <text
                x={centroX}
                y={centroY + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="white"
            >
                {elemento.symbol}
            </text>

            {/* Electrones por capa */}
            {shells.map((cantidad, i) =>
                posicionesElectrones(radioBase + i * espacioEntreCapas, cantidad, centroX, centroY).map((pos, j) => (
                    <circle
                        key={`e-${i}-${j}`}
                        cx={pos.x}
                        cy={pos.y}
                        r="4"
                        fill="#a5f3fc"
                    />
                ))
            )}

            {/* Etiqueta de carga (solo aparece cuando el átomo ya es ion) */}
            {carga !== 0 && (
                <text
                    x={centroX}
                    y={centroY - 34 - shells.length * espacioEntreCapas}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill={carga > 0 ? "#f87171" : "#60a5fa"}
                >
                    {carga > 0 ? `${carga}+` : `${Math.abs(carga)}−`}
                </text>
            )}

            {/* Nombre del elemento debajo */}
            <text
                x={centroX}
                y={centroY + 34 + shells.length * espacioEntreCapas}
                textAnchor="middle"
                fontSize="12"
                fill="#94a3b8"
            >
                {elemento.name}
            </text>
        </g>
    );
}

export default AtomDiagram;