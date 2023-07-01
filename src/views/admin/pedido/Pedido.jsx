import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import pedidoService from "./../../../services/pedidoService"
import Modal from "../../../components/Modal";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Pedido = () => {

    const [pedidos, setPedidos] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [q, setq] = useState('')
    const [modalOpen, setOpenModal] = useState(false)
    const [pedido, setPedido] = useState({})

    useEffect(() => {
        getPedidos()
    }, [])

    const resetData = () => {
        setOpenModal(false)
    }

    const columnas = [
        { key: "id", label: "COD" },
        { key: "fecha", label: "FECHA PEDIDO" },
        { key: "Cliente.nombre_completo", label: "CLIENTE" },
    ]

    const getPedidos = async (nroPage = 1, limit = 4) => {
        setPage(nroPage)
        const { data } = await pedidoService.listar(q, nroPage, limit)

        setTotal(data.count)
        setPedidos(data.rows)
    }

    const handleShow = (datos) => {
        console.log(datos)
        setPedido(datos)
        setOpenModal(true)
    }
    const handlePDF = (data) => {
        const doc = new jsPDF();

        // Encabezado del recibo
        doc.setFontSize(18);
        doc.text('Recibo de Compra', 14, 20);

        // Fecha
        const formattedFecha = new Date(data.fecha).toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Fecha: ${formattedFecha}`, 14, 30);

        // Contenido del recibo
        doc.setFontSize(12);
        doc.text(`Cliente: ${data.Cliente.nombre_completo}`, 14, 50);
        doc.text(`Correo: ${data.Cliente.correo}`, 14, 60);
        doc.text(`CI/NIT: ${data.Cliente.ci_nit}`, 14, 70);
        doc.text(`Teléfono: ${data.Cliente.telefono}`, 14, 80);

        // Detalles de los productos
        const productosData = data.Productos.map((producto) => [producto.nombre, producto.PedidoProducto.cantidad, `$${producto.precio}`]);
        doc.autoTable({
            startY: 100,
            head: [['Producto', 'Cantidad', 'Precio']],
            body: productosData,
        });

        // Total
        const total = data.Productos.reduce(
            (total, producto) => total + parseFloat(producto.precio),
            0
        );
        doc.setFontSize(12);
        doc.text(`Total: $${total}`, 14, doc.autoTable.previous.finalY + 10);

        // Guardar el archivo PDF
        doc.save('recibo.pdf');
    }
    
    return (
        <>

            <TablePagination columnas={columnas} datos={pedidos} total={total} page={page} fetchData={getPedidos} handleShow={handleShow} handlePDF={handlePDF}></TablePagination>

            { false && <h1>Hola</h1> }

            {pedido.id && (

                <Modal modalOpen={modalOpen} setOpenModal={resetData}>

                    <div className="max-w-md mx-auto p-4 border border-gray-400">
                        <div className="flex justify-between">
                            <h1 className="text-lg font-bold">Recibo de Compra</h1>
                            <p className="text-sm">Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
                        </div>
                        <hr className="my-2" />

                        <div className="mt-4">
                            <p className="font-bold">Cliente:</p>
                            <p>{pedido.Cliente.nombre_completo}</p>
                            <p>Correo: {pedido.Cliente.correo}</p>
                            <p>CI/NIT: {pedido.Cliente.ci_nit}</p>
                            <p>Teléfono: {pedido.Cliente.telefono}</p>
                        </div>

                        <div className="mt-6">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Producto</th>
                                        <th className="px-4 py-2">C.</th>
                                        <th className="px-4 py-2">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.Productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td className="px-4 py-2">{producto.nombre}</td>
                                            <td className="px-4 py-2">{producto.PedidoProducto.cantidad}</td>
                                            <td className="px-4 py-2">{producto.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="font-bold px-4 py-2">Total:</td>
                                        <td className="font-bold px-4 py-2">
                                            {pedido.Productos.reduce(
                                                (total, producto) => total + parseFloat(producto.precio),
                                                0
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                </Modal>
            )}
        </>
    );
}

export default Pedido;