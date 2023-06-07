import { useState, useEffect } from "react";
import categoriaService from "../services/categoriaService";

const Categoria = () => {
    // estado
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        listar()
    }, [])
    // funciones

    const listar = async () => {
        const {data} = await categoriaService.listar()
        setCategorias(data)
    }

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>DETALLE</th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td>{cat.detalle}</td>
                                <td></td>
                            </tr>
                        )
                    )}

                </tbody>
            </table>

        </div>        
    );
}

export default Categoria;