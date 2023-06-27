import { useEffect, useState } from "react"
import clienteService from "../../../services/clienteService"
import Modal from "../../../components/Modal"
import productoService from "../../../services/productoService"
import TablePagination from "../../../components/TablePagination"

const PedidoNuevo = () => {
    const [cliente, setCliente] = useState({ nombre_completo: "", correo: "", ci_nit: "", telefono: "" })
    const [modalOpen, setOpenModal] = useState(false)

    // lista productos
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
    const [q, setq] = useState('')
    const [productos, setProductos] = useState([])

    useEffect(() => {
        getProductos()
    }, [])


    const resetData = () => {
        setCliente({ nombre_completo: "", correo: "", ci_nit: "", telefono: "" })
        setOpenModal(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevState => ({
            ...prevState,
            [name]: value
        })))
    }
    const funGuardar = async (e) => {
        e.preventDefault();
        try {
            await clienteService.guardar(cliente)
            resetData()

        } catch (error) {
            console.log(error)
        }
    }


    const getProductos = async (nroPage = 1, limit = 10) => {
        setPage(nroPage)
        const { data } = await productoService.listar(q, nroPage, limit)
        console.log("TOTAL:", data.count)
        console.log("Registros:", data.rows)
        setTotal(data.count)
        setProductos(data.rows)
    }

    const handleAddCarrito = () => {
        
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="bg-white p-4 rounded shadow">
                        <div className="overflow-x-auto">

                            <TablePagination columnas={columnas} datos={productos} total={total} page={page} fetchData={getProductos} handleAddCarrito={handleAddCarrito}></TablePagination>
                        </div>



                    </div>
                </div>
                <div className="md:col-span-1 grid gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Carrito</h1>
                        <table className="w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left text-sm font-medium uppercase">NOM</th>
                                    <th className="py-2 px-4 text-left text-sm font-medium uppercase">C.</th>
                                    <th className="py-2 px-4 text-left text-sm font-medium uppercase">PRECIO</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="py-2 px-4 text-sm text-gray-500"></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <input
                            type="search"
                            name="buscar"
                            className="border border-gray-300 rounded px-2 py-1 mb-2"
                        />
                        <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setOpenModal(!modalOpen)}>
                            NUEVO CLIENTE
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Pedido</h1>
                    </div>

                </div>
            </div>
            <Modal modalOpen={modalOpen} setOpenModal={resetData}>
                <form onSubmit={(e) => funGuardar(e)}>

                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="nombre_completo"
                        value={cliente.nombre_completo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded" />
                </form>

            </Modal>
        </>
    );
}

export default PedidoNuevo;