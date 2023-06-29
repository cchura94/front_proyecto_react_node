import { useEffect, useState } from "react"
import clienteService from "../../../services/clienteService"
import Modal from "../../../components/Modal"
import productoService from "../../../services/productoService"
import TablePagination from "../../../components/TablePagination"
import pedidoService from "../../../services/pedidoService"

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

    // carrito
    const [carrito, setCarrito] = useState([])
    // cliente
    const [buscar, setBuscar] = useState("")
    const [cliente_seleccionado, setClienteSeleccionado] = useState(null)

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
            const { data } = await pedidoService.nuevoCliente(cliente)
            setClienteSeleccionado(data.cliente)
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

    const handleAddCarrito = (prod) => {
        console.log(prod)
        let temp = [...carrito];
        var foundIndex = temp.findIndex(x => x.productoId == prod.id);
        console.log(foundIndex)
        if(foundIndex == -1){
            const item = { productoId: prod.id, nombre: prod.nombre, cantidad: 1, precio: prod.precio }
            setCarrito([...carrito, item])
        }
    }
    const quitarCarrito = (pos) => {

        const temp = [...carrito];

        // removing the element using splice
        temp.splice(pos, 1);

        // updating the list
        setCarrito(temp);

    }
    const funBuscarCliente = async (e) => {
        e.preventDefault();

        console.log(buscar)
        const { data } = await pedidoService.buscarCliente(buscar);
        console.log(data)
        setClienteSeleccionado(data)

    }

    const funGuardarPedido = async () => {
        if(confirm("¿Está Seguro de Guarar El Pedido?")){
            try {
                const datos = {
                    clienteId: cliente_seleccionado.id,
                    items: carrito
                }

                const {data} = await pedidoService.guardar(datos);
                if(data.pedido){
                    // redireccion
                }
                
            } catch (error) {
                alert("Ocurrio un error al registrar el pedido");
            }
        }
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
                                {carrito.map((prod, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 text-sm text-gray-500">{prod.nombre}</td>
                                        <td className="py-2 px-4 text-sm text-gray-500">{prod.cantidad}</td>
                                        <td className="py-2 px-4 text-sm text-gray-500">{prod.precio}</td>
                                        <td className="py-2 px-4 text-sm text-gray-500">
                                            <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => quitarCarrito(index)}>
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <form onSubmit={(e) => funBuscarCliente(e)}>
                            <input
                                type="search"
                                name="buscar"
                                className="border border-gray-300 rounded px-2 py-1 mb-2"
                                onChange={(e) => setBuscar(e.target.value)}
                                required
                            />
                            <input type="submit" value="buscar" />
                        </form>
                        <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setOpenModal(!modalOpen)}>
                            NUEVO CLIENTE
                        </button>
                        {cliente_seleccionado && (

                            <div class="bg-indigo-500 text-white font-bold rounded-lg border shadow-lg p-2">

                                CLIENTE: {cliente_seleccionado?.nombre_completo}
                                <hr />
                                CI/NIT: {cliente_seleccionado?.ci_nit}
                                <hr />
                                TELEFONO: {cliente_seleccionado?.telefono}
                                <hr />
                                CORREO: {cliente_seleccionado?.correo}
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Registro pedido</h1>
                        <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => funGuardarPedido()}>
                            Guardar Pedido
                        </button>
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
                    <label>CI / NIT</label>
                    <input
                        type="text"
                        name="ci_nit"
                        value={cliente.ci_nit}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />
                    <label>CORREO</label>
                    <input
                        type="email"
                        name="correo"
                        value={cliente.correo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />
                    <label>Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded" />
                </form>

            </Modal>
        </>
    );
}

export default PedidoNuevo;