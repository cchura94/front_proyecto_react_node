import { useState, useEffect } from "react";
import productoService from "../../services/productoService";
import categoriaService from "../../services/categoriaService";
import Modal from "../../components/Modal";

const Producto = () => {
    // const [columnas, setColumnas] = useState(["nombre", "precio", "stock", "estado", "Categorium.nombre"])
    const columnas = [
        { key: "id", label: "COD" },
        { key: "nombre", label: "NOMBRE" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "CANTIDAD" },
        { key: "Categorium.nombre", label: "CATEGORIA" },
    ]
    // paginacion
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2)
    const [q, setq] = useState('')
    const [limit, setLimit] = useState(10)
    const [productos, setProductos] = useState([])
    const [modalOpen, setOpenModal] = useState(false)
    const [producto, setProducto] = useState({ nombre: "", precio: 0, stock: 0, categoria_id: "", descripcion: "" })
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        getProductos()
        getCategorias()
    }, [])

    const getProductos = async (nroPage=1, limit=2) => {
        setPage(nroPage)
        const { data } = await productoService.listar(q, nroPage, limit)
        console.log("TOTAL:", data.count)
        console.log("Registros:", data.rows)
        setTotal(data.count)
        setProductos(data.rows)
    }

    const getCategorias = async () => {
        const { data } = await categoriaService.listar()
        setCategorias(data)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("NAME: ", name, " VALUE: ", value)
        setProducto((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    const funGuardar = async (e) => {
        e.preventDefault();
        try {
            if (producto.id) {
                await productoService.modificar(producto.id, producto)
            } else {
                await productoService.guardar(producto)
            }
            resetData()
            getProductos()
        } catch (error) {
            console.log(error)
        }
    }

    const resetData = () => {
        setProducto({ nombre: "", precio: 0, stock: 0, categoria_id: "", descripcion: "" })
        setOpenModal(false)
    }

    const handleEdit = (datos) => {
        setProducto(datos)
        setOpenModal(true)

    }

    const handleDelete = async (datos) => {
        if (confirm("Eliminar el Producto?")) {
            try {
                await productoService.eliminar(datos.id)

                getProductos()

            } catch (error) {
                alert("Ocurrió un problema al intentar eliminar")

            }
        }
    }

    return (
        <>
            <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setOpenModal(!modalOpen)}>
                NUEVO
            </button>
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th className="py-2 px-4 text-left text-sm font-medium uppercase" key={index}>{columna.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {productos.map((prod, index) => (
                        <tr key={prod.id}>
                            {columnas.map((col, pos) => (
                                <td className="py-2 px-4 text-sm text-gray-500" key={pos}>{eval('prod.' + col.key)}</td>
                            ))}
                            <td className="py-2 px-4 text-sm text-gray-500">

                                <button className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 rounded" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => handleEdit(prod)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                                <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => handleDelete(prod)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                    <button onClick={() => getProductos(page-1)} disabled={page == 1} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-l-md">
                            anterior
                    </button>
                    {total > itemsPerPage && (
                        <div className="flex">
                            {Array.from({length: Math.ceil(total / itemsPerPage)}).map((_, index) => (
                                <button key={index} onClick={() => getProductos(index+1)} className={`${page === index + 1? 'bg-blue-500 text-white':'bg-gray-200 text-gray-700'} py-2 px-4 mx-1 rounded-md focus:outline-none`}>
                                        {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                    <button onClick={() => getProductos(page+1)} disabled={page == Math.ceil(total / itemsPerPage)} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-r-md">
                            siguiente
                    </button>
                </nav>
            </div>

            <Modal modalOpen={modalOpen} setOpenModal={resetData}>

                {/* JSON.stringify(producto) */}
                <form onSubmit={(e) => funGuardar(e)}>

                    <label>Ingrese Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <label>Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <label>Cantidad:</label>
                    <input
                        type="number"
                        name="stock"
                        value={producto.stock}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <label>Categoria:</label>
                    <select name="categoriaId" onChange={handleChange} required className="border border-gray-300 rounded px-2 py-1 mb-2 w-full">
                        <option value="-1">Seleccione Una Opción</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id} selected={cat.id == producto.categoriaId ? true : false} >{cat.nombre}</option>
                        ))}
                    </select>

                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        cols="30"
                        rows="3"
                        value={producto.descripcion}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    ></textarea>



                    <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded" />
                </form>
            </Modal>
        </>
    );
}

export default Producto;