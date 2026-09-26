import { categorias } from '../services/categorias';
import '../css/Legend.css';

function Leyenda({ categoriasActivas, alSeleccionar }) {
    return (
        <div className="leyenda">
            {categorias.map(({ class: clase, name: nombre }) => {
                const activa = categoriasActivas.includes(clase);
                return (
                    <button
                        key={clase}
                        className={`leyenda-item ${activa ? 'activa' : ''}`}
                        onClick={() => alSeleccionar(clase)}
                        type="button"
                    >
                        <span className={`leyenda-color ${clase}`}></span>
                        <span className="leyenda-texto">{nombre}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default Leyenda;