import { compoundNicknames } from './compoundNicknames';

function electronesValenciaPorGrupo(xpos) {
    const mapa = {
        13: 3,
        14: 4,
        15: 5, // N, P...
        16: 6, // O, S...
        17: 7, // F, Cl, Br...
        18: 8, // gases nobles
    };
    return mapa[xpos] ?? null;
}

function analizarElemento(elemento) {
    const cat = elemento.category;

    if (cat === "alkali metal") {
        return { rol: "dona", cantidad: 1 };
    }
    if (cat === "alkaline earth metal") {
        return { rol: "dona", cantidad: 2 };
    }
    if (cat === "diatomic nonmetal" || cat === "polyatomic nonmetal") {
        const valencia = electronesValenciaPorGrupo(elemento.xpos);
        if (valencia == null || valencia >= 8) return { rol: "no-soportado" };
        return { rol: "necesita", cantidad: 8 - valencia };
    }

    // post-transition metal, transition metal, metalloid, noble gas,
    // lanthanide, actinide, unknown → no soportado en esta beta
    return { rol: "no-soportado" };
}

export function evaluarPar(elemento1, elemento2) {
    const a1 = analizarElemento(elemento1);
    const a2 = analizarElemento(elemento2);

    if (a1.rol === "no-soportado" || a2.rol === "no-soportado") {
        return {
            compatible: false,
            razon: `${elemento1.name} or ${elemento2.name}'s bonding behavior isn't supported in this beta simulation yet.`,
        };
    }

    if (a1.rol === "dona" && a2.rol === "dona") {
        return {
            compatible: false,
            razon: `Both ${elemento1.name} and ${elemento2.name} tend to donate electrons — neither can accept them, so no transfer happens.`,
        };
    }

    if (a1.rol === "necesita" && a2.rol === "necesita") {
        return {
            compatible: false,
            razon: `Both ${elemento1.name} and ${elemento2.name} need to gain electrons — this pair would form a covalent bond (shared electrons), which isn't what this simulator shows.`,
        };
    }

    const metal = a1.rol === "dona" ? elemento1 : elemento2;
    const noMetal = a1.rol === "dona" ? elemento2 : elemento1;
    const dona = a1.rol === "dona" ? a1 : a2;
    const necesita = a1.rol === "dona" ? a2 : a1;

    if (dona.cantidad !== necesita.cantidad) {
        return {
            compatible: false,
            razon: `This pair needs more than one atom of ${dona.cantidad > necesita.cantidad ? noMetal.name : metal.name} to balance charges. Not supported in this beta — try a 1:1 pair like Sodium + Chlorine.`,
        };
    }

    const formula = `${metal.symbol}${noMetal.symbol}`;
    const apodo = compoundNicknames[formula] ?? null;

    return {
        compatible: true,
        metal,
        noMetal,
        electronesTransferidos: dona.cantidad,
        formula,
        chemicalName: apodo?.chemicalName ?? null,
        commonName: apodo?.commonName ?? null,
    };
}