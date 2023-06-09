import { useState, useEffect } from "react";
import categoriaService from "../services/categoriaService";

const Categoria = () => {
    // estado
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("");
    const [detalle, setDetalle] = useState("");
    const [idseleccion, setIdSeleccion] = useState(null);
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        listar()
    }, [])
    // funciones

    const listar = async () => {
        const {data} = await categoriaService.listar(buscar)
        setCategorias(data)
    }

    const guardar = async (e) => {
        e.preventDefault();

        if(idseleccion){
            await categoriaService.modificar(idseleccion,{nombre, detalle})
        }else{
            await categoriaService.guardar({nombre, detalle})
        }
        listar()

        setNombre("");
        setDetalle("");
        setIdSeleccion(null)
    }

    const editarCat = async (cat) => {
        setNombre(cat.nombre);
        setDetalle(cat.detalle);
        setIdSeleccion(cat.id)
        console.log(cat)

    }

    const eliminarCat = async(cat) => {
        if(confirm("¿Está seguro de eliminar la categoria?")){
            await categoriaService.eliminar(cat.id)
            listar()
        }
    }

    const funBuscar= (e) => {
        setBuscar(e.target.value)
        listar()
    }

    return (
        <div>

            <form onSubmit={(e) => guardar(e)}>
                <label htmlFor="">Ingrese Nombre:</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                <br />
                <label htmlFor="">Ingrese Detalle</label>
                <textarea cols="30" rows="3" value={detalle?detalle:''} onChange={e => setDetalle(e.target.value)}></textarea>
                <br />
                <input type="submit" />
            </form>

            <hr />
             BUSCAR POR NOMBRE: <input type="text" onChange={(e) => funBuscar(e)} />
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
                                <td>
                                    <button onClick={() => editarCat(cat)}>editar</button>
                                    <button onClick={() => eliminarCat(cat)}>eliminar</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

        </div>        
    );
}

export default Categoria;